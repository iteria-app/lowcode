<script>
  import { hoveredNodeId, rootNodes, profilerEnabled } from "../store.js";
  // import Toolbar from '../toolbar/Toolbar.svelte'
  // import Search from '../toolbar/Search.svelte'
  // import ProfileButton from '../toolbar/ProfileButton.svelte'
  // import PickerButton from '../toolbar/PickerButton.svelte'
  // import VisibilityButton from '../toolbar/VisibilityButton.svelte'
  // import ComponentView from '../panel/ComponentView.svelte'
  // import Profiler from '../profiler/Profiler.svelte'
  // import ConnectMessage from '../ConnectMessage.svelte'
  import Node from "../nodes/Node.svelte";
  // import '../client/index'

  //window.document.addEventListener
</script>

<b>ahoj</b>
{#each ['A', 'B', 'C'] as item}
  <div>{item}</div>
  <!--{#if item == 'B'}
  nasiel som
  {/if}
  <div>{item}</div>a
  {#if true}
     vnturi <p>if</p>
  {/if}
-->
{/each}
