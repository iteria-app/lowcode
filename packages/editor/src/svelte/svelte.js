//import { add, update, remove } from './listener.js'
//import { updateProfile } from './profiler.js'

export let DevListener = class {
  constructor() {
    this.nodeMap = new Map()
    this._id = 0
    this.currentBlock = null
    this.rootNodes = []
    this.svelteVersion = null
    this.lastPromiseParent = null
  }

  getNode(id) {
    return this.nodeMap.get(id)
  }

  getAllNodes() {
    this.nodeMap.values()
  }

  getRootNodes() {
    return this.rootNodes
  }

  getSvelteVersion() {
    return this.svelteVersion
  }

  addNode(node, target, anchor) {
    this.nodeMap.set(node.id, node)
    this.nodeMap.set(node.detail, node)

    let targetNode = this.nodeMap.get(target)
    if (!targetNode || targetNode.parentBlock != node.parentBlock) {
      targetNode = node.parentBlock
    }

    node.parent = targetNode

    const anchorNode = this.nodeMap.get(anchor)

    if (targetNode) {
      let index = -1
      if (anchorNode) index = targetNode.children.indexOf(anchorNode)

      if (index != -1) {
        targetNode.children.splice(index, 0, node)
      } else {
        targetNode.children.push(node)
      }
    } else {
      this.rootNodes.push(node)
    }

    //TODO add(node, anchorNode)
  }

  removeNode(node) {
    if (!node) return

    this.nodeMap.delete(node.id)
    this.nodeMap.delete(node.detail)

    const index = node.parent.children.indexOf(node)
    node.parent.children.splice(index, 1)
    node.parent = null

    //TODO remove(node)
  }

  updateElement(element) {
    const node = this.nodeMap.get(element)
    if (!node) return

    if (node.type == 'anchor') node.type = 'text'

    //TODO update(node)
  }

  insert(element, target, anchor) {
    const node = {
      id: this._id++,
      type:
        element.nodeType == 1
          ? 'element'
          : element.nodeValue && element.nodeValue != ' '
          ? 'text'
          : 'anchor',
      detail: element,
      tagName: element.nodeName.toLowerCase(),
      parentBlock: this.currentBlock,
      children: []
    }
    this.addNode(node, target, anchor)

    for (const child of element.childNodes) {
      if (!this.nodeMap.has(child)) this.insert(child, element)
    }
  }

  svelteRegisterComponent(e) {
    const { component, tagName } = e.detail

    const node = this.nodeMap.get(component.$$.fragment)
    if (node) {
      this.nodeMap.delete(component.$$.fragment)

      node.detail = component
      node.tagName = tagName

      //TODO update(node)
    } else {
      this.nodeMap.set(component.$$.fragment, {
        type: 'component',
        detail: component,
        tagName
      })
    }
  }

  // Ugly hack b/c promises are resolved/rejected outside of normal render flow
  svelteRegisterBlock(e) {
    const { type, id, block, ...detail } = e.detail
    const tagName = type == 'pending' ? 'await' : type
    const nodeId = this._id++

    if (block.m) {
      const mountFn = block.m
      block.m = (target, anchor) => {
        const parentBlock = this.currentBlock
        let node = {
          id: nodeId,
          type: 'block',
          detail,
          tagName,
          parentBlock,
          children: []
        }

        switch (type) {
          case 'then':
          case 'catch':
            if (!node.parentBlock) node.parentBlock = this.lastPromiseParent
            break

          case 'slot':
            node.type = 'slot'
            break

          case 'component':
            const componentNode = this.nodeMap.get(block)
            if (componentNode) {
              this.nodeMap.delete(block)
              Object.assign(node, componentNode)
            } else {
              Object.assign(node, {
                type: 'component',
                tagName: 'Unknown',
                detail: {}
              })
              this.nodeMap.set(block, node)
            }

            Promise.resolve().then(
              () =>
                node.detail.$$ &&
                Object.keys(node.detail.$$.bound).length// &&
                //TODO update(node)
            )
            break
        }

        if (type == 'each') {
          let group = this.nodeMap.get(parentBlock.id + id)
          if (!group) {
            group = {
              id: this._id++,
              type: 'block',
              detail: {
                ctx: {},
                source: detail.source
              },
              tagName: 'each',
              parentBlock,
              children: []
            }
            this.nodeMap.set(parentBlock.id + id, group)
            this.addNode(group, target, anchor)
          }
          node.parentBlock = group
          node.type = 'iteration'
          this.addNode(node, group, anchor)
        } else {
          this.addNode(node, target, anchor)
        }

        this.currentBlock = node
        //TODO updateProfile(node, 'mount', mountFn, target, anchor)
        this.currentBlock = parentBlock
      }
    }

    if (block.p) {
      const patchFn = block.p
      block.p = (changed, ctx) => {
        const parentBlock = this.currentBlock
        this.currentBlock = this.nodeMap.get(nodeId)

        //TODO update(this.currentBlock)

        //TODO updateProfile(this.currentBlock, 'patch', patchFn, changed, ctx)

        this.currentBlock = parentBlock
      }
    }

    if (block.d) {
      const detachFn = block.d
      block.d = detaching => {
        const node = this.nodeMap.get(nodeId)

        if (node) {
          if (node.tagName == 'await') this.lastPromiseParent = node.parentBlock

          this.removeNode(node)
        }

        //TODO updateProfile(node, 'detach', detachFn, detaching)
      }
    }
  }

  svelteDOMInsert(e) {
    const { node: element, target, anchor } = e.detail

    this.insert(element, target, anchor)
  }

  svelteDOMRemove(e) {
    const node = this.nodeMap.get(e.detail.node)
    if (!node) return

    this.removeNode(node)
  }

  svelteDOMAddEventListener(e) {
    const { node, ...detail } = e.detail

    if (!node.__listeners) node.__listeners = []

    node.__listeners.push(detail)
  }

  svelteDOMRemoveEventListener(e) {
    const { node, event, handler, modifiers } = e.detail

    if (!node.__listeners) return

    const index = node.__listeners.findIndex(
      o => o.event == event && o.handler == handler && o.modifiers == modifiers
    )

    if (index == -1) return

    node.__listeners.splice(index, 1)
  }

  svelteUpdateNode(e) {
    this.updateElement(e.detail.node)
  }

  setup(root) {
    root.addEventListener('SvelteRegisterBlock', e => this.svelteVersion = e.detail.version, { once: true })

    root.addEventListener('SvelteRegisterComponent', svelteRegisterComponent)
    root.addEventListener('SvelteRegisterBlock', svelteRegisterBlock)
    root.addEventListener('SvelteDOMInsert', svelteDOMInsert)
    root.addEventListener('SvelteDOMRemove', svelteDOMRemove)
    root.addEventListener('SvelteDOMAddEventListener', svelteDOMAddEventListener)
    root.addEventListener('SvelteDOMRemoveEventListener', svelteDOMRemoveEventListener)
    root.addEventListener('SvelteDOMSetData', svelteUpdateNode)
    root.addEventListener('SvelteDOMSetProperty', svelteUpdateNode)
    root.addEventListener('SvelteDOMSetAttribute', svelteUpdateNode)
    root.addEventListener('SvelteDOMRemoveAttribute', svelteUpdateNode)
  }
}
/*
  setup(window.document)
  for (let i = 0; i < window.frames.length; i++) {
    const frame = window.frames[i]
    const root = frame.document
    setup(root)
    const timer = setInterval(() => {
      if (root == frame.document) return
      clearTimeout(timer)
      setup(frame.document)
    }, 0)
    root.addEventListener('readystatechange', e => clearTimeout(timer), { once: true })
  }
*/