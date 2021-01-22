//import { Node, Symbol } from './ast'

import { TsxWriter, TagBuilder, Callback, TagBuilderWriter } from './writer'

function component(componentName: string, packageName: string) {
    return { componentName, packageName: packageName + componentName }
}

//TableContainer 
//TableHead 
// 
//TableFooter

const muiCore = '@material-ui/core/'

export interface RowBuilder extends TagBuilder {
    row(build: (tag: CellBuilder) => void): void
}

export interface CellBuilder extends TagBuilder {
    cell(build: (tag: TagBuilder) => void): void
}

export class TableGenerator {
    //componentTableContainer = component('TableContainer', muiCore)
    componentTable = component('Table', muiCore)
    componentTableRow = component('TableRow', muiCore)
    componentTableCell = component('TableCell', muiCore)
    componentTableHead = component('TableHead', muiCore)
    componentTableBody = component('TableBody', muiCore)
    componentTableFooter = component('TableFooter', muiCore)

    gen: TsxWriter

    constructor(gen: TsxWriter) {
        this.gen = gen
    }

    table(build: Callback<RowBuilder>) {
        this.gen.tag(this.componentTable.componentName, (tag) => {
            build(new RowBuilderWriter(this.gen))
        })
    }

    genTableRow() {
        //date, time
        //decimal
    }
    genTableHead() {
        //date, time
        //decimal
    }
    genTableCell() {
        //TODO genValue()
    }
}    

class RowBuilderWriter extends TagBuilderWriter {
    gen: TsxWriter

    constructor(gen: TsxWriter) {
        super(gen.codeBlockWriter)
        this.gen = gen
    }

    row(build: (tag: CellBuilder) => void): void {
        this.codeBlockWriter.write('<')
        this.codeBlockWriter.write('TableRow')
        this.codeBlockWriter.write('>')
        this.codeBlockWriter.newLine()
        this.codeBlockWriter.indent()
        //build(new CellBuilderWriter(this.gen))
        this.codeBlockWriter.block(() => {
            //
            this.codeBlockWriter.write('textik')
        })
        this.codeBlockWriter.write('</')
        //this.codeBlockWriter.write('TableRow')
        this.codeBlockWriter.write('>')
    }
}

class CellBuilderWriter extends TagBuilderWriter {
    gen: TsxWriter

    constructor(gen: TsxWriter) {
        super(gen.codeBlockWriter)
        this.gen = gen
    }

    cell(build: (tag: TagBuilder) => void): void {
        this.codeBlockWriter.write('<')
        this.codeBlockWriter.write('TableCell')
        build(new TagBuilderWriter(this.gen.codeBlockWriter))
        this.codeBlockWriter.write('>')
        this.codeBlockWriter.write('</')
        this.codeBlockWriter.write('TabeCell')
        this.codeBlockWriter.write('>')
    }
}
