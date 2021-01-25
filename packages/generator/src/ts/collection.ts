
import { TableGenerator } from './table'
import { TsxCodeBlockWriter } from './writer'


export class CollectionGenerator {

    generate(props: any[]) {
        const gen = new TsxCodeBlockWriter()
        const tableGen = new TableGenerator(gen)
        tableGen.table((table) => {
            //TODO table.head()
            //TODO table.body()
            table.row((row) => {
                props.forEach(element => {
                    row.cell((cell) => {
                        //TODO format text                        
                    })
                })
            })
        })
    }

}