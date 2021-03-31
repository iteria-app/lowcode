import { InspectedElementValue, OwnerListItem } from "../react-lowcode/devtools"

import { guessSourceDirFromFileName} from "@iteria-app/react-lowcode/esm/workspace"

export function guessSourceDir(inspectedElement: InspectedElementValue, ownerList?: OwnerListItem[] | null) {
  const inspectedUrl = guessSourceDirFromFileName(inspectedElement?.source?.fileName)
  console.log('click guess source dir', inspectedElement?.source?.fileName, inspectedUrl, inspectedElement, ownerList)
  if (inspectedUrl) {
    return inspectedUrl
  }
  
  /*for (let owner of ownerList ?? []) {
    const fileName = cacheComponentIds.get(owner.id)?.source?.fileName
    if (fileName) {
      const url = guessSourceDirFromFileName(fileName)
      if (url) {
        return url
      }
    }
  }*/
}
  