import CodeBlockWriter from "code-block-writer";
import { TableGenerator } from './table'
import { TsxWriter } from './writer'

test('table test 1', () => {
  const writer = new CodeBlockWriter()
  const gen = new TableGenerator(new TsxWriter(writer))
  gen.table((table) => {
    table.row((row) => {
    //   row.cell((cell) => {
    //     //cell.attribute
    //   })
    })
  })
  console.log(
    'xxx',
    writer.toString()
  )
})