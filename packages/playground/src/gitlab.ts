function decodeUnicode(base64: string) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
export async function gitlabFetchFile(filename: string, privateToken: string) {
    const filenameUrlEnc = encodeURI(filename).replaceAll('/', '%2F')
    const ref = 'a164f5d5461f3ade0d1458f4e607e4066151e657'//'master'//'gitlabAPI-lowcode'
    const projectId = 18967974
    const gitlabUrl = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${filenameUrlEnc}?ref=${ref}`
    return await fetch(gitlabUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            cache: 'no-store',
            'PRIVATE-TOKEN': privateToken
        }
    })
    .then(res => {
        //console.log('gitlabFetch', filename, gitlabUrl, res)
        const result = res.json().then(data => {
            if (data.content) {
                if (filename.indexOf('/sk.js') > 0) {
                    console.log('gitlabFetch', filename, gitlabUrl, data)
                }
                let resData = decodeUnicode(data.content);
                return resData
            }
            return `/* 404 ${gitlabUrl} */`
        })

        console.log("got", filename)
        return result
    }).catch(err => {
        console.log('gitlabFetch', filename, gitlabUrl, err)
    })
}

export const files = [
    {
        "id": "486eafa4e7a04debd29339de3edaa74b02f5bcaa",
        "name": "build",
        "type": "tree",
        "path": "build",
        "mode": "040000"
    },
    {
        "id": "49a9820b4b5ff4384e4669102951d96b5089f1b1",
        "name": "cypress",
        "type": "tree",
        "path": "cypress",
        "mode": "040000"
    },
    {
        "id": "65e941d4cf0b1ce9f5e276cb20380dcd0c4e6539",
        "name": "fixtures",
        "type": "tree",
        "path": "cypress/fixtures",
        "mode": "040000"
    },
    {
        "id": "0c286ed0f828a948926a9529b36cc65a54b416b8",
        "name": "integration",
        "type": "tree",
        "path": "cypress/integration",
        "mode": "040000"
    },
    {
        "id": "0700d99f9837a059d212cf2e2d8032c5af1cdad1",
        "name": "activities",
        "type": "tree",
        "path": "cypress/integration/activities",
        "mode": "040000"
    },
    {
        "id": "86db006bd88ead567f99d81509b9c1426911ef6a",
        "name": "activityTypes",
        "type": "tree",
        "path": "cypress/integration/activityTypes",
        "mode": "040000"
    },
    {
        "id": "c3d2db173d37369b426c9cf6c8b1dafdd6d7e45d",
        "name": "calendar",
        "type": "tree",
        "path": "cypress/integration/calendar",
        "mode": "040000"
    },
    {
        "id": "8aa23a9f66acaa7128bfcd5e106282b23274cd23",
        "name": "programs",
        "type": "tree",
        "path": "cypress/integration/programs",
        "mode": "040000"
    },
    {
        "id": "6bff4c962f218be41afbe4b472a219577e7cc034",
        "name": "resources",
        "type": "tree",
        "path": "cypress/integration/resources",
        "mode": "040000"
    },
    {
        "id": "db4735543718c5337d42cdf7e7d7a1b328c78575",
        "name": "plugins",
        "type": "tree",
        "path": "cypress/plugins",
        "mode": "040000"
    },
    {
        "id": "f7c83d86184a66c0884a402802df2a37ad56c534",
        "name": "support",
        "type": "tree",
        "path": "cypress/support",
        "mode": "040000"
    },
    {
        "id": "227e7e0104d724e1cfd3607e7d711e131b6d3163",
        "name": "docs",
        "type": "tree",
        "path": "docs",
        "mode": "040000"
    },
    {
        "id": "c836e532b3085525ba6c3ba5e7ef8e2161fe1b79",
        "name": "packages",
        "type": "tree",
        "path": "packages",
        "mode": "040000"
    },
    {
        "id": "2ca96ac5a02156b577bf1c21d3d922494ff1dbba",
        "name": "auditlog",
        "type": "tree",
        "path": "packages/auditlog",
        "mode": "040000"
    },
    {
        "id": "9885f5ba331db910fcc77a03801d90b1339d9160",
        "name": "beesport-graphql",
        "type": "tree",
        "path": "packages/beesport-graphql",
        "mode": "040000"
    },
    {
        "id": "103fa45fd1a081d6af6af810178c2db2b9aa1fe8",
        "name": "public",
        "type": "tree",
        "path": "public",
        "mode": "040000"
    },
    {
        "id": "b28534ca815c8f4ffc5597eb09b42bb2800513d3",
        "name": "hdts",
        "type": "tree",
        "path": "public/hdts",
        "mode": "040000"
    },
    {
        "id": "1dd6def4d3093895d0c2fa72f3acab13d0c6ad5e",
        "name": "src",
        "type": "tree",
        "path": "src",
        "mode": "040000"
    },
    {
        "id": "60a8ef27a1f6c5ec3028cc09f55a512ff0ec9966",
        "name": "components",
        "type": "tree",
        "path": "src/components",
        "mode": "040000"
    },
    {
        "id": "fbb5193a93aba29e43e0f9b02d12a809fc965814",
        "name": "activities",
        "type": "tree",
        "path": "src/components/activities",
        "mode": "040000"
    },
    {
        "id": "941f0ac7c502f9c80088c5a2719904d7ef1ade3d",
        "name": "beesportComponents",
        "type": "tree",
        "path": "src/components/beesportComponents",
        "mode": "040000"
    },
    {
        "id": "d0c962bc0e7abd62e16a01d93300bd18cd3da8bb",
        "name": "eventDialogs",
        "type": "tree",
        "path": "src/components/eventDialogs",
        "mode": "040000"
    },
    {
        "id": "f4e254572356a193c1e7ca0a4125b8cf3871a493",
        "name": "fullcalendar",
        "type": "tree",
        "path": "src/components/fullcalendar",
        "mode": "040000"
    },
    {
        "id": "3e669a9c1d8f71166cd5fdf78784736024c1ce3b",
        "name": "orders",
        "type": "tree",
        "path": "src/components/orders",
        "mode": "040000"
    },
    {
        "id": "67697318d306daede4cfd816b2e3e941c12eb375",
        "name": "programs",
        "type": "tree",
        "path": "src/components/programs",
        "mode": "040000"
    },
    {
        "id": "1bef35b69fb837ba57974fc342caaf1bad4d22f5",
        "name": "resources",
        "type": "tree",
        "path": "src/components/resources",
        "mode": "040000"
    },
    {
        "id": "a97243f85e183b7f202797cf5261e8f93b68884d",
        "name": "localizations",
        "type": "tree",
        "path": "src/localizations",
        "mode": "040000"
    },
    {
        "id": "0f400ca9f160c9c29e6b99b03aaed2a6990cc016",
        "name": "services",
        "type": "tree",
        "path": "src/services",
        "mode": "040000"
    },
    {
        "id": "30a1d6a8d361eb6b1172825ad351be31ddcebaec",
        "name": ".gitignore",
        "type": "blob",
        "path": ".gitignore",
        "mode": "100644"
    },
    {
        "id": "6bbb589f1d78e6ae13e411718c6b03a381556aa2",
        "name": "LICENSE",
        "type": "blob",
        "path": "LICENSE",
        "mode": "100644"
    },
    {
        "id": "9f3be2a82faec8a2609bd93323d87886d787372c",
        "name": "README.md",
        "type": "blob",
        "path": "README.md",
        "mode": "100644"
    },
    {
        "id": "b5a25605d100cf92b600908db25919ac24aede56",
        "name": "_headers",
        "type": "blob",
        "path": "build/_headers",
        "mode": "100644"
    },
    {
        "id": "1deaf4038fb89e12da5ccd239e6730821be39f22",
        "name": "index.html",
        "type": "blob",
        "path": "build/index.html",
        "mode": "100644"
    },
    {
        "id": "709847dc95d6fc559747debdc0e1735cd9f9c8e5",
        "name": "netlify.toml",
        "type": "blob",
        "path": "build/netlify.toml",
        "mode": "100644"
    },
    {
        "id": "930bee0a8fb23f23f8e6a821ea739d0f4f8efcaa",
        "name": "codegen.yml",
        "type": "blob",
        "path": "codegen.yml",
        "mode": "100644"
    },
    {
        "id": "64f4dbbdd132d576ef5d9fd41d8afe6bc827ae3a",
        "name": "cypress.json",
        "type": "blob",
        "path": "cypress.json",
        "mode": "100644"
    },
    {
        "id": "da18d9352a17d427321962199a1fa43b8ab5cfe4",
        "name": "example.json",
        "type": "blob",
        "path": "cypress/fixtures/example.json",
        "mode": "100644"
    },
    {
        "id": "9b434d19ccac131d1d6ab1e5d147cc32d665b28c",
        "name": "addMultipleItems.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/addMultipleItems.spec.js",
        "mode": "100644"
    },
    {
        "id": "b5197923f270b4d95457c4670379bbd8de1db28b",
        "name": "addOrder.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/addOrder.spec.js",
        "mode": "100644"
    },
    {
        "id": "c579bfa9389a0ba9d9a82c509394977060cc1cbe",
        "name": "addPayment.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/addPayment.spec.js",
        "mode": "100644"
    },
    {
        "id": "1d765a37796707113f3474cb4a98dc662a141ff7",
        "name": "addToExisting.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/addToExisting.spec.js",
        "mode": "100644"
    },
    {
        "id": "6c4bc32d1399abff1efb89d599caf5ca9ea74806",
        "name": "deleteOrderItem.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/deleteOrderItem.spec.js",
        "mode": "100644"
    },
    {
        "id": "f36af8ce55760c788f248674942cab03900ab981",
        "name": "deletePayment.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/deletePayment.spec.js",
        "mode": "100644"
    },
    {
        "id": "cd9e887a65cd4af21eac9b56760f5dfd1b1873e8",
        "name": "editIsPlannable.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/editIsPlannable.spec.js",
        "mode": "100644"
    },
    {
        "id": "3bef2a7994dcfdb4b4a538b5e0d6e3b962933d10",
        "name": "editOrder.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/editOrder.spec.js",
        "mode": "100644"
    },
    {
        "id": "30ca061306d86e02a67a60af95f08facf20a1ab1",
        "name": "editPayment.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/editPayment.spec.js",
        "mode": "100644"
    },
    {
        "id": "301a52768630960f53f93f1bab1a925bed7ca690",
        "name": "editWithoutProgram.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/editWithoutProgram.spec.js",
        "mode": "100644"
    },
    {
        "id": "e535e8c5f7df21a7acecbf4fcfa5220ac1355405",
        "name": "emptyInputs.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/emptyInputs.spec.js",
        "mode": "100644"
    },
    {
        "id": "bece862a44b745e16d51efb5629fb53b38387ae3",
        "name": "addActivityType.spec.js",
        "type": "blob",
        "path": "cypress/integration/activityTypes/addActivityType.spec.js",
        "mode": "100644"
    },
    {
        "id": "c630316e37418adc119644104f99de0c783be3ae",
        "name": "deleteActivityType.spec.js",
        "type": "blob",
        "path": "cypress/integration/activityTypes/deleteActivityType.spec.js",
        "mode": "100644"
    },
    {
        "id": "e04b65a17bda822906aff45fd0a41011e496b334",
        "name": "editActivityType.spec.js",
        "type": "blob",
        "path": "cypress/integration/activityTypes/editActivityType.spec.js",
        "mode": "100644"
    },
    {
        "id": "ee574de1b6a3fab0fac9c9e4d149ee115f786ded",
        "name": "addToCalendar.spec.js",
        "type": "blob",
        "path": "cypress/integration/calendar/addToCalendar.spec.js",
        "mode": "100644"
    },
    {
        "id": "2629e77be66aca8a708480144907ed92528f3c0b",
        "name": "addProgram.spec.js",
        "type": "blob",
        "path": "cypress/integration/programs/addProgram.spec.js",
        "mode": "100644"
    },
    {
        "id": "3f8205c4e2ec4ae8125b1f84cdac5d6905905ce5",
        "name": "editProgram.spec.js",
        "type": "blob",
        "path": "cypress/integration/programs/editProgram.spec.js",
        "mode": "100644"
    },
    {
        "id": "299867da07ef0e82bd055098f01558d9e4230fa4",
        "name": "location.spec.js",
        "type": "blob",
        "path": "cypress/integration/programs/location.spec.js",
        "mode": "100644"
    },
    {
        "id": "32c366e043f2e831d8528658722f6dbcc7bd2336",
        "name": "network_requests.spec.js",
        "type": "blob",
        "path": "cypress/integration/programs/network_requests.spec.js",
        "mode": "100644"
    },
    {
        "id": "52cf749d6427cc9814fd1a31bece04e5f9ffb8a1",
        "name": "addResource.spec.js",
        "type": "blob",
        "path": "cypress/integration/resources/addResource.spec.js",
        "mode": "100644"
    },
    {
        "id": "fbea2a13e3c2d183e52d07097be7f804e246d84b",
        "name": "deleteResource.spec.js",
        "type": "blob",
        "path": "cypress/integration/resources/deleteResource.spec.js",
        "mode": "100644"
    },
    {
        "id": "0e17432e0138fb0985faf20bd17177849065f8b6",
        "name": "editResource.spec.js",
        "type": "blob",
        "path": "cypress/integration/resources/editResource.spec.js",
        "mode": "100644"
    },
    {
        "id": "aa9918d2153059ab3d866dba7b2f4e39e6d24d7c",
        "name": "index.js",
        "type": "blob",
        "path": "cypress/plugins/index.js",
        "mode": "100644"
    },
    {
        "id": "0a0eee3b5198c3a26f3dc5d2d7f29faa6322d138",
        "name": "commands.js",
        "type": "blob",
        "path": "cypress/support/commands.js",
        "mode": "100644"
    },
    {
        "id": "5125358826a9fbf03e2637ebf0a272f0a71a4988",
        "name": "index.js",
        "type": "blob",
        "path": "cypress/support/index.js",
        "mode": "100644"
    },
    {
        "id": "fb2de799422f6d8a1a33a90bb3b2a45f999f64b5",
        "name": "BESTPRACTICES.md",
        "type": "blob",
        "path": "docs/BESTPRACTICES.md",
        "mode": "100644"
    },
    {
        "id": "c4380212b75fe83b15474c2a1c3c5166db25aa13",
        "name": "orderby.md",
        "type": "blob",
        "path": "docs/orderby.md",
        "mode": "100644"
    },
    {
        "id": "3cfad97f8b9d8020839e0575108929d68d880efc",
        "name": "jest.config.js",
        "type": "blob",
        "path": "jest.config.js",
        "mode": "100644"
    },
    {
        "id": "5fdf001693fb83eac7540dcc27026275ad474c4f",
        "name": "jest.setup.js",
        "type": "blob",
        "path": "jest.setup.js",
        "mode": "100644"
    },
    {
        "id": "c3ec4f9898a46cd331fd6f5e8f7c018ca66a5dcf",
        "name": "package-lock.json",
        "type": "blob",
        "path": "package-lock.json",
        "mode": "100644"
    },
    {
        "id": "1fb3ff421029a6eb31d29d39a13b669398aa86b9",
        "name": "package.json",
        "type": "blob",
        "path": "package.json",
        "mode": "100644"
    },
    {
        "id": "b268f77379c463325b2c282d8f3fa1e1e11c1f2a",
        "name": "audit.sql",
        "type": "blob",
        "path": "packages/auditlog/audit.sql",
        "mode": "100644"
    },
    {
        "id": "918f12d6c871473da9eebaa019e98823f33a31de",
        "name": "audit_sql_script.sql",
        "type": "blob",
        "path": "packages/auditlog/audit_sql_script.sql",
        "mode": "100644"
    },
    {
        "id": "c2658d7d1b31848c3b71960543cb0368e56cd4c7",
        "name": ".gitignore",
        "type": "blob",
        "path": "packages/beesport-graphql/.gitignore",
        "mode": "100644"
    },
    {
        "id": "21e641785f57737f629ed24daf2a4d3dc1b01069",
        "name": "README.md",
        "type": "blob",
        "path": "packages/beesport-graphql/README.md",
        "mode": "100644"
    },
    {
        "id": "ff63bfaaa35d196fcf005e6010ee3df87e6f0d25",
        "name": "index.js",
        "type": "blob",
        "path": "packages/beesport-graphql/index.js",
        "mode": "100644"
    },
    {
        "id": "a36cec2ce67eb4329de4584e92a385395b5af60d",
        "name": "package-lock.json",
        "type": "blob",
        "path": "packages/beesport-graphql/package-lock.json",
        "mode": "100644"
    },
    {
        "id": "5f8a50c74d406d98487a5be8ddfc0d9fd3963e6a",
        "name": "package.json",
        "type": "blob",
        "path": "packages/beesport-graphql/package.json",
        "mode": "100644"
    },
    {
        "id": "65ac89126124f39bd920a9e2f96a2270c9462d4c",
        "name": "orderState-trigger.sql",
        "type": "blob",
        "path": "packages/orderState-trigger.sql",
        "mode": "100644"
    },
    {
        "id": "3af58957b97c49c418787e5b6a572aa346ea2eba",
        "name": "triggers.sql",
        "type": "blob",
        "path": "packages/triggers.sql",
        "mode": "100644"
    },
    {
        "id": "50cc6c0cb61b19f846137c188669941a21218ded",
        "name": "favicon.ico",
        "type": "blob",
        "path": "public/favicon.ico",
        "mode": "100644"
    },
    {
        "id": "9fa211252080046a23b2449dbdced6abc2b0bb34",
        "name": "MaterialIcons-Regular.570eb83859dc23dd0eec (1).woff2",
        "type": "blob",
        "path": "public/hdts/MaterialIcons-Regular.570eb83859dc23dd0eec (1).woff2",
        "mode": "100644"
    },
    {
        "id": "9fa211252080046a23b2449dbdced6abc2b0bb34",
        "name": "MaterialIcons-Regular.570eb83859dc23dd0eec.woff2",
        "type": "blob",
        "path": "public/hdts/MaterialIcons-Regular.570eb83859dc23dd0eec.woff2",
        "mode": "100644"
    },
    {
        "id": "7015564ad166a3e9d88c82f17829f0cc01ebe29a",
        "name": "MaterialIcons-Regular.a37b0c01c0baf1888ca8.ttf",
        "type": "blob",
        "path": "public/hdts/MaterialIcons-Regular.a37b0c01c0baf1888ca8.ttf",
        "mode": "100644"
    },
    {
        "id": "6b146d7089d7de38d1d61e427155123f1e8757fc",
        "name": "hdts.css",
        "type": "blob",
        "path": "public/hdts/hdts.css",
        "mode": "100644"
    },
    {
        "id": "b14dd71707a6e638dd60af6f9ec3ec958b24595f",
        "name": "styles.7f170e7a0c87d9824432.css",
        "type": "blob",
        "path": "public/hdts/styles.7f170e7a0c87d9824432.css",
        "mode": "100644"
    },
    {
        "id": "da16c9852a2bd2aec1e4a4f9f51911adb218100d",
        "name": "index.html",
        "type": "blob",
        "path": "public/index.html",
        "mode": "100644"
    },
    {
        "id": "0181f71b2c9f308522c937bb18769489e7bef9ba",
        "name": "index.html.bak",
        "type": "blob",
        "path": "public/index.html.bak",
        "mode": "100644"
    },
    {
        "id": "c051f1a34d4d71e8c8ce818dcabf492367da307b",
        "name": "logo.svg",
        "type": "blob",
        "path": "public/logo.svg",
        "mode": "100644"
    },
    {
        "id": "e9e57dc4d41b9b46e05112e9f45b7ea6ac0ba15e",
        "name": "robots.txt",
        "type": "blob",
        "path": "public/robots.txt",
        "mode": "100644"
    },
    {
        "id": "6b65865497fbca2d9b1b03d7b5103b82b98a4d1f",
        "name": "snowpack.config.js",
        "type": "blob",
        "path": "snowpack.config.js",
        "mode": "100644"
    },
    {
        "id": "d3cc8da06be36f74e63a86f1fe5473a9b401257e",
        "name": "ActivityTypes.svelte",
        "type": "blob",
        "path": "src/ActivityTypes.svelte",
        "mode": "100644"
    },
    {
        "id": "ca771bd319e13201bb9e7733393a3ccfa92fb3a9",
        "name": "App.svelte",
        "type": "blob",
        "path": "src/App.svelte",
        "mode": "100644"
    },
    {
        "id": "c04b7af8332afca86001085c0bb77cf496af8918",
        "name": "App.test.js",
        "type": "blob",
        "path": "src/App.test.js",
        "mode": "100644"
    },
    {
        "id": "dfff922b9aabbd1d9827e234b3da51b92b2c954b",
        "name": "AppConfig.svelte",
        "type": "blob",
        "path": "src/AppConfig.svelte",
        "mode": "100644"
    },
    {
        "id": "d3e18360961f07f94c368a75cdbe1a668081a52f",
        "name": "AppPlanning.svelte",
        "type": "blob",
        "path": "src/AppPlanning.svelte",
        "mode": "100644"
    },
    {
        "id": "fa01b1f26a021ffc84fd91521ba2d8bcbb5bd58a",
        "name": "AppReports.svelte",
        "type": "blob",
        "path": "src/AppReports.svelte",
        "mode": "100644"
    },
    {
        "id": "ca9face971472be20dcdb07007e27c0c9729fee6",
        "name": "DoneActivities.svelte",
        "type": "blob",
        "path": "src/DoneActivities.svelte",
        "mode": "100644"
    },
    {
        "id": "52c7375fd78e50dd3da6e4f285319d8d97395ade",
        "name": "PlannedActivities.svelte",
        "type": "blob",
        "path": "src/PlannedActivities.svelte",
        "mode": "100644"
    },
    {
        "id": "2559e238d0b095c075b44d6ba81a5edeb7c1e1f0",
        "name": "Planning.svelte",
        "type": "blob",
        "path": "src/Planning.svelte",
        "mode": "100644"
    },
    {
        "id": "75e092eb62daea473057c13d3bc7f7c9b6560318",
        "name": "Players.svelte",
        "type": "blob",
        "path": "src/Players.svelte",
        "mode": "100644"
    },
    {
        "id": "5fc629ac8a702f7de447cfc41551d17f7c91b570",
        "name": "Programs.svelte",
        "type": "blob",
        "path": "src/Programs.svelte",
        "mode": "100644"
    },
    {
        "id": "b2bb016896cc6674b1ee9e764c7a6058bdfd7507",
        "name": "ReportsNotPaid.svelte",
        "type": "blob",
        "path": "src/ReportsNotPaid.svelte",
        "mode": "100644"
    },
    {
        "id": "486eafa4e7a04debd29339de3edaa74b02f5bcaa",
        "name": "build",
        "type": "tree",
        "path": "build",
        "mode": "040000"
    },
    {
        "id": "49a9820b4b5ff4384e4669102951d96b5089f1b1",
        "name": "cypress",
        "type": "tree",
        "path": "cypress",
        "mode": "040000"
    },
    {
        "id": "65e941d4cf0b1ce9f5e276cb20380dcd0c4e6539",
        "name": "fixtures",
        "type": "tree",
        "path": "cypress/fixtures",
        "mode": "040000"
    },
    {
        "id": "0c286ed0f828a948926a9529b36cc65a54b416b8",
        "name": "integration",
        "type": "tree",
        "path": "cypress/integration",
        "mode": "040000"
    },
    {
        "id": "0700d99f9837a059d212cf2e2d8032c5af1cdad1",
        "name": "activities",
        "type": "tree",
        "path": "cypress/integration/activities",
        "mode": "040000"
    },
    {
        "id": "86db006bd88ead567f99d81509b9c1426911ef6a",
        "name": "activityTypes",
        "type": "tree",
        "path": "cypress/integration/activityTypes",
        "mode": "040000"
    },
    {
        "id": "c3d2db173d37369b426c9cf6c8b1dafdd6d7e45d",
        "name": "calendar",
        "type": "tree",
        "path": "cypress/integration/calendar",
        "mode": "040000"
    },
    {
        "id": "8aa23a9f66acaa7128bfcd5e106282b23274cd23",
        "name": "programs",
        "type": "tree",
        "path": "cypress/integration/programs",
        "mode": "040000"
    },
    {
        "id": "6bff4c962f218be41afbe4b472a219577e7cc034",
        "name": "resources",
        "type": "tree",
        "path": "cypress/integration/resources",
        "mode": "040000"
    },
    {
        "id": "db4735543718c5337d42cdf7e7d7a1b328c78575",
        "name": "plugins",
        "type": "tree",
        "path": "cypress/plugins",
        "mode": "040000"
    },
    {
        "id": "f7c83d86184a66c0884a402802df2a37ad56c534",
        "name": "support",
        "type": "tree",
        "path": "cypress/support",
        "mode": "040000"
    },
    {
        "id": "227e7e0104d724e1cfd3607e7d711e131b6d3163",
        "name": "docs",
        "type": "tree",
        "path": "docs",
        "mode": "040000"
    },
    {
        "id": "c836e532b3085525ba6c3ba5e7ef8e2161fe1b79",
        "name": "packages",
        "type": "tree",
        "path": "packages",
        "mode": "040000"
    },
    {
        "id": "2ca96ac5a02156b577bf1c21d3d922494ff1dbba",
        "name": "auditlog",
        "type": "tree",
        "path": "packages/auditlog",
        "mode": "040000"
    },
    {
        "id": "9885f5ba331db910fcc77a03801d90b1339d9160",
        "name": "beesport-graphql",
        "type": "tree",
        "path": "packages/beesport-graphql",
        "mode": "040000"
    },
    {
        "id": "103fa45fd1a081d6af6af810178c2db2b9aa1fe8",
        "name": "public",
        "type": "tree",
        "path": "public",
        "mode": "040000"
    },
    {
        "id": "b28534ca815c8f4ffc5597eb09b42bb2800513d3",
        "name": "hdts",
        "type": "tree",
        "path": "public/hdts",
        "mode": "040000"
    },
    {
        "id": "1dd6def4d3093895d0c2fa72f3acab13d0c6ad5e",
        "name": "src",
        "type": "tree",
        "path": "src",
        "mode": "040000"
    },
    {
        "id": "60a8ef27a1f6c5ec3028cc09f55a512ff0ec9966",
        "name": "components",
        "type": "tree",
        "path": "src/components",
        "mode": "040000"
    },
    {
        "id": "fbb5193a93aba29e43e0f9b02d12a809fc965814",
        "name": "activities",
        "type": "tree",
        "path": "src/components/activities",
        "mode": "040000"
    },
    {
        "id": "941f0ac7c502f9c80088c5a2719904d7ef1ade3d",
        "name": "beesportComponents",
        "type": "tree",
        "path": "src/components/beesportComponents",
        "mode": "040000"
    },
    {
        "id": "d0c962bc0e7abd62e16a01d93300bd18cd3da8bb",
        "name": "eventDialogs",
        "type": "tree",
        "path": "src/components/eventDialogs",
        "mode": "040000"
    },
    {
        "id": "f4e254572356a193c1e7ca0a4125b8cf3871a493",
        "name": "fullcalendar",
        "type": "tree",
        "path": "src/components/fullcalendar",
        "mode": "040000"
    },
    {
        "id": "3e669a9c1d8f71166cd5fdf78784736024c1ce3b",
        "name": "orders",
        "type": "tree",
        "path": "src/components/orders",
        "mode": "040000"
    },
    {
        "id": "67697318d306daede4cfd816b2e3e941c12eb375",
        "name": "programs",
        "type": "tree",
        "path": "src/components/programs",
        "mode": "040000"
    },
    {
        "id": "1bef35b69fb837ba57974fc342caaf1bad4d22f5",
        "name": "resources",
        "type": "tree",
        "path": "src/components/resources",
        "mode": "040000"
    },
    {
        "id": "a97243f85e183b7f202797cf5261e8f93b68884d",
        "name": "localizations",
        "type": "tree",
        "path": "src/localizations",
        "mode": "040000"
    },
    {
        "id": "0f400ca9f160c9c29e6b99b03aaed2a6990cc016",
        "name": "services",
        "type": "tree",
        "path": "src/services",
        "mode": "040000"
    },
    {
        "id": "30a1d6a8d361eb6b1172825ad351be31ddcebaec",
        "name": ".gitignore",
        "type": "blob",
        "path": ".gitignore",
        "mode": "100644"
    },
    {
        "id": "6bbb589f1d78e6ae13e411718c6b03a381556aa2",
        "name": "LICENSE",
        "type": "blob",
        "path": "LICENSE",
        "mode": "100644"
    },
    {
        "id": "9f3be2a82faec8a2609bd93323d87886d787372c",
        "name": "README.md",
        "type": "blob",
        "path": "README.md",
        "mode": "100644"
    },
    {
        "id": "b5a25605d100cf92b600908db25919ac24aede56",
        "name": "_headers",
        "type": "blob",
        "path": "build/_headers",
        "mode": "100644"
    },
    {
        "id": "1deaf4038fb89e12da5ccd239e6730821be39f22",
        "name": "index.html",
        "type": "blob",
        "path": "build/index.html",
        "mode": "100644"
    },
    {
        "id": "709847dc95d6fc559747debdc0e1735cd9f9c8e5",
        "name": "netlify.toml",
        "type": "blob",
        "path": "build/netlify.toml",
        "mode": "100644"
    },
    {
        "id": "930bee0a8fb23f23f8e6a821ea739d0f4f8efcaa",
        "name": "codegen.yml",
        "type": "blob",
        "path": "codegen.yml",
        "mode": "100644"
    },
    {
        "id": "64f4dbbdd132d576ef5d9fd41d8afe6bc827ae3a",
        "name": "cypress.json",
        "type": "blob",
        "path": "cypress.json",
        "mode": "100644"
    },
    {
        "id": "da18d9352a17d427321962199a1fa43b8ab5cfe4",
        "name": "example.json",
        "type": "blob",
        "path": "cypress/fixtures/example.json",
        "mode": "100644"
    },
    {
        "id": "9b434d19ccac131d1d6ab1e5d147cc32d665b28c",
        "name": "addMultipleItems.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/addMultipleItems.spec.js",
        "mode": "100644"
    },
    {
        "id": "b5197923f270b4d95457c4670379bbd8de1db28b",
        "name": "addOrder.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/addOrder.spec.js",
        "mode": "100644"
    },
    {
        "id": "c579bfa9389a0ba9d9a82c509394977060cc1cbe",
        "name": "addPayment.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/addPayment.spec.js",
        "mode": "100644"
    },
    {
        "id": "1d765a37796707113f3474cb4a98dc662a141ff7",
        "name": "addToExisting.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/addToExisting.spec.js",
        "mode": "100644"
    },
    {
        "id": "6c4bc32d1399abff1efb89d599caf5ca9ea74806",
        "name": "deleteOrderItem.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/deleteOrderItem.spec.js",
        "mode": "100644"
    },
    {
        "id": "f36af8ce55760c788f248674942cab03900ab981",
        "name": "deletePayment.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/deletePayment.spec.js",
        "mode": "100644"
    },
    {
        "id": "cd9e887a65cd4af21eac9b56760f5dfd1b1873e8",
        "name": "editIsPlannable.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/editIsPlannable.spec.js",
        "mode": "100644"
    },
    {
        "id": "3bef2a7994dcfdb4b4a538b5e0d6e3b962933d10",
        "name": "editOrder.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/editOrder.spec.js",
        "mode": "100644"
    },
    {
        "id": "30ca061306d86e02a67a60af95f08facf20a1ab1",
        "name": "editPayment.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/editPayment.spec.js",
        "mode": "100644"
    },
    {
        "id": "301a52768630960f53f93f1bab1a925bed7ca690",
        "name": "editWithoutProgram.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/editWithoutProgram.spec.js",
        "mode": "100644"
    },
    {
        "id": "e535e8c5f7df21a7acecbf4fcfa5220ac1355405",
        "name": "emptyInputs.spec.js",
        "type": "blob",
        "path": "cypress/integration/activities/emptyInputs.spec.js",
        "mode": "100644"
    },
    {
        "id": "bece862a44b745e16d51efb5629fb53b38387ae3",
        "name": "addActivityType.spec.js",
        "type": "blob",
        "path": "cypress/integration/activityTypes/addActivityType.spec.js",
        "mode": "100644"
    },
    {
        "id": "c630316e37418adc119644104f99de0c783be3ae",
        "name": "deleteActivityType.spec.js",
        "type": "blob",
        "path": "cypress/integration/activityTypes/deleteActivityType.spec.js",
        "mode": "100644"
    },
    {
        "id": "e04b65a17bda822906aff45fd0a41011e496b334",
        "name": "editActivityType.spec.js",
        "type": "blob",
        "path": "cypress/integration/activityTypes/editActivityType.spec.js",
        "mode": "100644"
    },
    {
        "id": "ee574de1b6a3fab0fac9c9e4d149ee115f786ded",
        "name": "addToCalendar.spec.js",
        "type": "blob",
        "path": "cypress/integration/calendar/addToCalendar.spec.js",
        "mode": "100644"
    },
    {
        "id": "2629e77be66aca8a708480144907ed92528f3c0b",
        "name": "addProgram.spec.js",
        "type": "blob",
        "path": "cypress/integration/programs/addProgram.spec.js",
        "mode": "100644"
    },
    {
        "id": "3f8205c4e2ec4ae8125b1f84cdac5d6905905ce5",
        "name": "editProgram.spec.js",
        "type": "blob",
        "path": "cypress/integration/programs/editProgram.spec.js",
        "mode": "100644"
    },
    {
        "id": "299867da07ef0e82bd055098f01558d9e4230fa4",
        "name": "location.spec.js",
        "type": "blob",
        "path": "cypress/integration/programs/location.spec.js",
        "mode": "100644"
    },
    {
        "id": "32c366e043f2e831d8528658722f6dbcc7bd2336",
        "name": "network_requests.spec.js",
        "type": "blob",
        "path": "cypress/integration/programs/network_requests.spec.js",
        "mode": "100644"
    },
    {
        "id": "52cf749d6427cc9814fd1a31bece04e5f9ffb8a1",
        "name": "addResource.spec.js",
        "type": "blob",
        "path": "cypress/integration/resources/addResource.spec.js",
        "mode": "100644"
    },
    {
        "id": "fbea2a13e3c2d183e52d07097be7f804e246d84b",
        "name": "deleteResource.spec.js",
        "type": "blob",
        "path": "cypress/integration/resources/deleteResource.spec.js",
        "mode": "100644"
    },
    {
        "id": "0e17432e0138fb0985faf20bd17177849065f8b6",
        "name": "editResource.spec.js",
        "type": "blob",
        "path": "cypress/integration/resources/editResource.spec.js",
        "mode": "100644"
    },
    {
        "id": "aa9918d2153059ab3d866dba7b2f4e39e6d24d7c",
        "name": "index.js",
        "type": "blob",
        "path": "cypress/plugins/index.js",
        "mode": "100644"
    },
    {
        "id": "0a0eee3b5198c3a26f3dc5d2d7f29faa6322d138",
        "name": "commands.js",
        "type": "blob",
        "path": "cypress/support/commands.js",
        "mode": "100644"
    },
    {
        "id": "5125358826a9fbf03e2637ebf0a272f0a71a4988",
        "name": "index.js",
        "type": "blob",
        "path": "cypress/support/index.js",
        "mode": "100644"
    },
    {
        "id": "fb2de799422f6d8a1a33a90bb3b2a45f999f64b5",
        "name": "BESTPRACTICES.md",
        "type": "blob",
        "path": "docs/BESTPRACTICES.md",
        "mode": "100644"
    },
    {
        "id": "c4380212b75fe83b15474c2a1c3c5166db25aa13",
        "name": "orderby.md",
        "type": "blob",
        "path": "docs/orderby.md",
        "mode": "100644"
    },
    {
        "id": "3cfad97f8b9d8020839e0575108929d68d880efc",
        "name": "jest.config.js",
        "type": "blob",
        "path": "jest.config.js",
        "mode": "100644"
    },
    {
        "id": "5fdf001693fb83eac7540dcc27026275ad474c4f",
        "name": "jest.setup.js",
        "type": "blob",
        "path": "jest.setup.js",
        "mode": "100644"
    },
    {
        "id": "c3ec4f9898a46cd331fd6f5e8f7c018ca66a5dcf",
        "name": "package-lock.json",
        "type": "blob",
        "path": "package-lock.json",
        "mode": "100644"
    },
    {
        "id": "1fb3ff421029a6eb31d29d39a13b669398aa86b9",
        "name": "package.json",
        "type": "blob",
        "path": "package.json",
        "mode": "100644"
    },
    {
        "id": "b268f77379c463325b2c282d8f3fa1e1e11c1f2a",
        "name": "audit.sql",
        "type": "blob",
        "path": "packages/auditlog/audit.sql",
        "mode": "100644"
    },
    {
        "id": "918f12d6c871473da9eebaa019e98823f33a31de",
        "name": "audit_sql_script.sql",
        "type": "blob",
        "path": "packages/auditlog/audit_sql_script.sql",
        "mode": "100644"
    },
    {
        "id": "c2658d7d1b31848c3b71960543cb0368e56cd4c7",
        "name": ".gitignore",
        "type": "blob",
        "path": "packages/beesport-graphql/.gitignore",
        "mode": "100644"
    },
    {
        "id": "21e641785f57737f629ed24daf2a4d3dc1b01069",
        "name": "README.md",
        "type": "blob",
        "path": "packages/beesport-graphql/README.md",
        "mode": "100644"
    },
    {
        "id": "ff63bfaaa35d196fcf005e6010ee3df87e6f0d25",
        "name": "index.js",
        "type": "blob",
        "path": "packages/beesport-graphql/index.js",
        "mode": "100644"
    },
    {
        "id": "a36cec2ce67eb4329de4584e92a385395b5af60d",
        "name": "package-lock.json",
        "type": "blob",
        "path": "packages/beesport-graphql/package-lock.json",
        "mode": "100644"
    },
    {
        "id": "5f8a50c74d406d98487a5be8ddfc0d9fd3963e6a",
        "name": "package.json",
        "type": "blob",
        "path": "packages/beesport-graphql/package.json",
        "mode": "100644"
    },
    {
        "id": "65ac89126124f39bd920a9e2f96a2270c9462d4c",
        "name": "orderState-trigger.sql",
        "type": "blob",
        "path": "packages/orderState-trigger.sql",
        "mode": "100644"
    },
    {
        "id": "3af58957b97c49c418787e5b6a572aa346ea2eba",
        "name": "triggers.sql",
        "type": "blob",
        "path": "packages/triggers.sql",
        "mode": "100644"
    },
    {
        "id": "50cc6c0cb61b19f846137c188669941a21218ded",
        "name": "favicon.ico",
        "type": "blob",
        "path": "public/favicon.ico",
        "mode": "100644"
    },
    {
        "id": "9fa211252080046a23b2449dbdced6abc2b0bb34",
        "name": "MaterialIcons-Regular.570eb83859dc23dd0eec (1).woff2",
        "type": "blob",
        "path": "public/hdts/MaterialIcons-Regular.570eb83859dc23dd0eec (1).woff2",
        "mode": "100644"
    },
    {
        "id": "9fa211252080046a23b2449dbdced6abc2b0bb34",
        "name": "MaterialIcons-Regular.570eb83859dc23dd0eec.woff2",
        "type": "blob",
        "path": "public/hdts/MaterialIcons-Regular.570eb83859dc23dd0eec.woff2",
        "mode": "100644"
    },
    {
        "id": "7015564ad166a3e9d88c82f17829f0cc01ebe29a",
        "name": "MaterialIcons-Regular.a37b0c01c0baf1888ca8.ttf",
        "type": "blob",
        "path": "public/hdts/MaterialIcons-Regular.a37b0c01c0baf1888ca8.ttf",
        "mode": "100644"
    },
    {
        "id": "6b146d7089d7de38d1d61e427155123f1e8757fc",
        "name": "hdts.css",
        "type": "blob",
        "path": "public/hdts/hdts.css",
        "mode": "100644"
    },
    {
        "id": "b14dd71707a6e638dd60af6f9ec3ec958b24595f",
        "name": "styles.7f170e7a0c87d9824432.css",
        "type": "blob",
        "path": "public/hdts/styles.7f170e7a0c87d9824432.css",
        "mode": "100644"
    },
    {
        "id": "da16c9852a2bd2aec1e4a4f9f51911adb218100d",
        "name": "index.html",
        "type": "blob",
        "path": "public/index.html",
        "mode": "100644"
    },
    {
        "id": "0181f71b2c9f308522c937bb18769489e7bef9ba",
        "name": "index.html.bak",
        "type": "blob",
        "path": "public/index.html.bak",
        "mode": "100644"
    },
    {
        "id": "c051f1a34d4d71e8c8ce818dcabf492367da307b",
        "name": "logo.svg",
        "type": "blob",
        "path": "public/logo.svg",
        "mode": "100644"
    },
    {
        "id": "e9e57dc4d41b9b46e05112e9f45b7ea6ac0ba15e",
        "name": "robots.txt",
        "type": "blob",
        "path": "public/robots.txt",
        "mode": "100644"
    },
    {
        "id": "6b65865497fbca2d9b1b03d7b5103b82b98a4d1f",
        "name": "snowpack.config.js",
        "type": "blob",
        "path": "snowpack.config.js",
        "mode": "100644"
    },
    {
        "id": "d3cc8da06be36f74e63a86f1fe5473a9b401257e",
        "name": "ActivityTypes.svelte",
        "type": "blob",
        "path": "src/ActivityTypes.svelte",
        "mode": "100644"
    },
    {
        "id": "ca771bd319e13201bb9e7733393a3ccfa92fb3a9",
        "name": "App.svelte",
        "type": "blob",
        "path": "src/App.svelte",
        "mode": "100644"
    },
    {
        "id": "c04b7af8332afca86001085c0bb77cf496af8918",
        "name": "App.test.js",
        "type": "blob",
        "path": "src/App.test.js",
        "mode": "100644"
    },
    {
        "id": "dfff922b9aabbd1d9827e234b3da51b92b2c954b",
        "name": "AppConfig.svelte",
        "type": "blob",
        "path": "src/AppConfig.svelte",
        "mode": "100644"
    },
    {
        "id": "d3e18360961f07f94c368a75cdbe1a668081a52f",
        "name": "AppPlanning.svelte",
        "type": "blob",
        "path": "src/AppPlanning.svelte",
        "mode": "100644"
    },
    {
        "id": "fa01b1f26a021ffc84fd91521ba2d8bcbb5bd58a",
        "name": "AppReports.svelte",
        "type": "blob",
        "path": "src/AppReports.svelte",
        "mode": "100644"
    },
    {
        "id": "ca9face971472be20dcdb07007e27c0c9729fee6",
        "name": "DoneActivities.svelte",
        "type": "blob",
        "path": "src/DoneActivities.svelte",
        "mode": "100644"
    },
    {
        "id": "52c7375fd78e50dd3da6e4f285319d8d97395ade",
        "name": "PlannedActivities.svelte",
        "type": "blob",
        "path": "src/PlannedActivities.svelte",
        "mode": "100644"
    },
    {
        "id": "2559e238d0b095c075b44d6ba81a5edeb7c1e1f0",
        "name": "Planning.svelte",
        "type": "blob",
        "path": "src/Planning.svelte",
        "mode": "100644"
    },
    {
        "id": "75e092eb62daea473057c13d3bc7f7c9b6560318",
        "name": "Players.svelte",
        "type": "blob",
        "path": "src/Players.svelte",
        "mode": "100644"
    },
    {
        "id": "5fc629ac8a702f7de447cfc41551d17f7c91b570",
        "name": "Programs.svelte",
        "type": "blob",
        "path": "src/Programs.svelte",
        "mode": "100644"
    },
    {
        "id": "b2bb016896cc6674b1ee9e764c7a6058bdfd7507",
        "name": "ReportsNotPaid.svelte",
        "type": "blob",
        "path": "src/ReportsNotPaid.svelte",
        "mode": "100644"
    },
    {
        "id": "4dba540d485cac6d9a98cd51f32342567959e847",
        "name": "ReportsPaid.svelte",
        "type": "blob",
        "path": "src/ReportsPaid.svelte",
        "mode": "100644"
    },
    {
        "id": "86e5c42153998c0977370917a0df20721c4b4ea9",
        "name": "Resources.svelte",
        "type": "blob",
        "path": "src/Resources.svelte",
        "mode": "100644"
    },
    {
        "id": "dac7500116e3620525402973d3e0e031f129f4b5",
        "name": "Trainers.svelte",
        "type": "blob",
        "path": "src/Trainers.svelte",
        "mode": "100644"
    },
    {
        "id": "7fcf06cd4118945d44ffcbe3fefa1eefe600c919",
        "name": "Units.svelte",
        "type": "blob",
        "path": "src/Units.svelte",
        "mode": "100644"
    },
    {
        "id": "3c9634fecc9006f401c0c2995ca97813698b0487",
        "name": "Activities.svelte",
        "type": "blob",
        "path": "src/components/Activities.svelte",
        "mode": "100644"
    },
    {
        "id": "f884de8680abb0e38298feb8f2eb3e2746b4bdf2",
        "name": "ActivitiesForPlanning.svelte",
        "type": "blob",
        "path": "src/components/ActivitiesForPlanning.svelte",
        "mode": "100644"
    },
    {
        "id": "1735e4dc2b7aafd2f7bfedd4d5364370f7ce7437",
        "name": "ActivitiesTree.svelte",
        "type": "blob",
        "path": "src/components/ActivitiesTree.svelte",
        "mode": "100644"
    },
    {
        "id": "bb754e89dd9321d0f21114233a8b7947eb31d3b7",
        "name": "ActivityForPlanning.svelte",
        "type": "blob",
        "path": "src/components/ActivityForPlanning.svelte",
        "mode": "100644"
    },
    {
        "id": "0acf64a37714184d6030bf6f99f8711dbd6d1967",
        "name": "CalendarEvent.svelte",
        "type": "blob",
        "path": "src/components/CalendarEvent.svelte",
        "mode": "100644"
    },
    {
        "id": "4f41bfc482bb633e360868daab54882be7939fbc",
        "name": "Cell.svelte",
        "type": "blob",
        "path": "src/components/Cell.svelte",
        "mode": "100644"
    },
    {
        "id": "1db4bafdde0bac2c3f3b11fa7f12e595a4133c8d",
        "name": "CellActions.svelte",
        "type": "blob",
        "path": "src/components/CellActions.svelte",
        "mode": "100644"
    },
    {
        "id": "d1a68130b066fa5b5384b23324a9e4de077eb78a",
        "name": "CellHead.svelte",
        "type": "blob",
        "path": "src/components/CellHead.svelte",
        "mode": "100644"
    },
    {
        "id": "5f87f8f4e2042bb140c1a49382d67bdd817f85c5",
        "name": "Chip.svelte",
        "type": "blob",
        "path": "src/components/Chip.svelte",
        "mode": "100644"
    },
    {
        "id": "f60ddd0c994e233485c28a591f77b2bec283046f",
        "name": "ConfirmDialog.svelte",
        "type": "blob",
        "path": "src/components/ConfirmDialog.svelte",
        "mode": "100644"
    },
    {
        "id": "99377a321b7a588c09a8c44727ac7db6470046f6",
        "name": "DateClickDialog.svelte",
        "type": "blob",
        "path": "src/components/DateClickDialog.svelte",
        "mode": "100644"
    },
    {
        "id": "b625c566b37ac75fd236610e614c54161e95f010",
        "name": "Dialog.svelte",
        "type": "blob",
        "path": "src/components/Dialog.svelte",
        "mode": "100644"
    },
    {
        "id": "186707eb0a9a878417360f32772d66d56197b3ec",
        "name": "DialogCopy.svelte",
        "type": "blob",
        "path": "src/components/DialogCopy.svelte",
        "mode": "100644"
    },
    {
        "id": "a7f830f0ee8a5deb8892c678c8c56caabc620794",
        "name": "EventClick.svelte",
        "type": "blob",
        "path": "src/components/EventClick.svelte",
        "mode": "100644"
    },
    {
        "id": "b298dfdad081b36479bf3f3d8ff71a6efcb6f316",
        "name": "EventReceiveDialog.svelte",
        "type": "blob",
        "path": "src/components/EventReceiveDialog.svelte",
        "mode": "100644"
    },
    {
        "id": "88f5aa34857449284cbf876b8502067d6363ed57",
        "name": "Form.svelte",
        "type": "blob",
        "path": "src/components/Form.svelte",
        "mode": "100644"
    },
    {
        "id": "69679eeecb62091904854c62fb624bc86c2b3d2c",
        "name": "Input.svelte",
        "type": "blob",
        "path": "src/components/Input.svelte",
        "mode": "100644"
    },
    {
        "id": "c567d755b52005dd438071b953c3a7298b5302f9",
        "name": "Pagination.svelte",
        "type": "blob",
        "path": "src/components/Pagination.svelte",
        "mode": "100644"
    },
    {
        "id": "7fb0e2c41b9eb3480a519f6e9f0a8eab8524f3ee",
        "name": "PlayersLookup.svelte",
        "type": "blob",
        "path": "src/components/PlayersLookup.svelte",
        "mode": "100644"
    },
    {
        "id": "e47e8464b7c5868d17e7c385475f59121ee76783",
        "name": "Progress.svelte",
        "type": "blob",
        "path": "src/components/Progress.svelte",
        "mode": "100644"
    },
    {
        "id": "0bd3904e4b7299f2d6a599daf1892900fa8bfced",
        "name": "ReportSummary.svelte",
        "type": "blob",
        "path": "src/components/ReportSummary.svelte",
        "mode": "100644"
    },
    {
        "id": "054fb2bee13500839ae0cb9aad76afc72fd3cf4f",
        "name": "Resources.svelte",
        "type": "blob",
        "path": "src/components/Resources.svelte",
        "mode": "100644"
    },
    {
        "id": "58c2e6029bcbb84ff54b109507890e70976200fd",
        "name": "ResourcesForPlanning.svelte",
        "type": "blob",
        "path": "src/components/ResourcesForPlanning.svelte",
        "mode": "100644"
    },
    {
        "id": "af4b825f0787664b519031e6477d3607b9f2d667",
        "name": "Row.svelte",
        "type": "blob",
        "path": "src/components/Row.svelte",
        "mode": "100644"
    },
    {
        "id": "e4dc21c056da15e640894bea22a815aad49aa096",
        "name": "RowHead.svelte",
        "type": "blob",
        "path": "src/components/RowHead.svelte",
        "mode": "100644"
    },
    {
        "id": "bcc558222d83e3a7976d28f345a44312eb204408",
        "name": "Select.svelte",
        "type": "blob",
        "path": "src/components/Select.svelte",
        "mode": "100644"
    },
    {
        "id": "028e957ddae4e89dd61641decd5a0180686d27de",
        "name": "Semaphore.svelte",
        "type": "blob",
        "path": "src/components/Semaphore.svelte",
        "mode": "100644"
    },
    {
        "id": "de58b5cd0f1e98f9b678bbfd583bc4802d3407cc",
        "name": "Snackbar.svelte",
        "type": "blob",
        "path": "src/components/Snackbar.svelte",
        "mode": "100644"
    },
    {
        "id": "1487ff73f9cf0e7c2bd1b834b39ce520b3d940be",
        "name": "SortableList.svelte",
        "type": "blob",
        "path": "src/components/SortableList.svelte",
        "mode": "100644"
    },
    {
        "id": "b6d38410524c03084c7894659c610303aa18b985",
        "name": "Tab.svelte",
        "type": "blob",
        "path": "src/components/Tab.svelte",
        "mode": "100644"
    },
    {
        "id": "2bde7c25e594017ab564f5c3b07d2feb85e8c35e",
        "name": "Table.svelte",
        "type": "blob",
        "path": "src/components/Table.svelte",
        "mode": "100644"
    },
    {
        "id": "6cc4d5fe0d9f43c529662b6ba3ab4a71f07a7c62",
        "name": "TableHead.svelte",
        "type": "blob",
        "path": "src/components/TableHead.svelte",
        "mode": "100644"
    },
    {
        "id": "57ca5377bb6cad967f5436ec3b7a18c91c8221ad",
        "name": "Tabs.svelte",
        "type": "blob",
        "path": "src/components/Tabs.svelte",
        "mode": "100644"
    },
    {
        "id": "b2a3cefc8315feff041647dc9281c82dcf50f7b3",
        "name": "TypescriptExample.svelte",
        "type": "blob",
        "path": "src/components/TypescriptExample.svelte",
        "mode": "100644"
    },
    {
        "id": "4940c15aa1798d033f3de48350e3b56f665e0cc5",
        "name": "EditActivity.svelte",
        "type": "blob",
        "path": "src/components/activities/EditActivity.svelte",
        "mode": "100644"
    },
    {
        "id": "2cfce4142774bb8faf44d6c2a1cecdddd3b62cbe",
        "name": "EditResources.svelte",
        "type": "blob",
        "path": "src/components/activities/EditResources.svelte",
        "mode": "100644"
    },
    {
        "id": "e816a20b8ce3197647330ef0930effe22b4b0e12",
        "name": "EditSimpleActivity.svelte",
        "type": "blob",
        "path": "src/components/activities/EditSimpleActivity.svelte",
        "mode": "100644"
    },
    {
        "id": "720e95f4b279ebeea5ce3da019e1995fcf3e1d14",
        "name": "resources.ts",
        "type": "blob",
        "path": "src/components/activities/resources.ts",
        "mode": "100644"
    },
    {
        "id": "b934c3a91619b53799a1a1f70e6c85023dffeafe",
        "name": "ActionButton.svelte",
        "type": "blob",
        "path": "src/components/beesportComponents/ActionButton.svelte",
        "mode": "100644"
    },
    {
        "id": "adb5d5799fe62c9906f168cc443502ca62cb5e60",
        "name": "AddButton.svelte",
        "type": "blob",
        "path": "src/components/beesportComponents/AddButton.svelte",
        "mode": "100644"
    },
    {
        "id": "ec1e1cc3558bc644642fdf5a9272486fa9b68394",
        "name": "Button.svelte",
        "type": "blob",
        "path": "src/components/beesportComponents/Button.svelte",
        "mode": "100644"
    },
    {
        "id": "0a4b62bd3a6ecd7ca09ef4f463b9c9035db7777d",
        "name": "AddActivityDialog.svelte",
        "type": "blob",
        "path": "src/components/eventDialogs/AddActivityDialog.svelte",
        "mode": "100644"
    },
    {
        "id": "774949d735f810b540dbec5e95b14d979ba43333",
        "name": "CalendarEventDialog.svelte",
        "type": "blob",
        "path": "src/components/eventDialogs/CalendarEventDialog.svelte",
        "mode": "100644"
    },
    {
        "id": "1740e1a4592fadec18c6c1c5d449e25237f25dd4",
        "name": "DeleteDialog.svelte",
        "type": "blob",
        "path": "src/components/eventDialogs/DeleteDialog.svelte",
        "mode": "100644"
    },
    {
        "id": "6ea0c3def07a73c62a40436b0573695ca064f710",
        "name": "Dialog.svelte",
        "type": "blob",
        "path": "src/components/eventDialogs/Dialog.svelte",
        "mode": "100644"
    },
    {
        "id": "f8fe20018a720a7fa51e489ce210fe1033315297",
        "name": "EditActivityDialog.svelte",
        "type": "blob",
        "path": "src/components/eventDialogs/EditActivityDialog.svelte",
        "mode": "100644"
    },
    {
        "id": "60f6d8f9b3714b2423e86962b8ad08bf276fafe2",
        "name": "aaa.json",
        "type": "blob",
        "path": "src/components/eventDialogs/aaa.json",
        "mode": "100644"
    },
    {
        "id": "60f6d8f9b3714b2423e86962b8ad08bf276fafe2",
        "name": "bbb.json",
        "type": "blob",
        "path": "src/components/eventDialogs/bbb.json",
        "mode": "100644"
    },
    {
        "id": "28a6a077457b371c00baeadc493c2a239456b882",
        "name": "cca.json",
        "type": "blob",
        "path": "src/components/eventDialogs/cca.json",
        "mode": "100644"
    },
    {
        "id": "3d90754d1ca9d9662272901e29964466eb953c02",
        "name": "ccb.json",
        "type": "blob",
        "path": "src/components/eventDialogs/ccb.json",
        "mode": "100644"
    },
    {
        "id": "d277e696f69d72b27e9e988a3e5fed3706896f25",
        "name": "deleteCalendarEvent.graphql",
        "type": "blob",
        "path": "src/components/eventDialogs/deleteCalendarEvent.graphql",
        "mode": "100644"
    },
    {
        "id": "f9cfcba6f36bbac3e8fb0e10a94a0b6ca7e8f4d0",
        "name": "query_activities.graphql",
        "type": "blob",
        "path": "src/components/eventDialogs/query_activities.graphql",
        "mode": "100644"
    },
    {
        "id": "08e231eb6e4b4817b5572ff38b83d7f93c5e5dda",
        "name": "unscheduleActivityIds.graphql",
        "type": "blob",
        "path": "src/components/eventDialogs/unscheduleActivityIds.graphql",
        "mode": "100644"
    },
    {
        "id": "8f306ad9bfdff2b6a3c744f41e5538e3f6b95841",
        "name": "validate.js",
        "type": "blob",
        "path": "src/components/eventDialogs/validate.js",
        "mode": "100644"
    },
    {
        "id": "0f4e5e44bc490f25924eed1da87d2942b6d1cd4a",
        "name": "Calendar.svelte",
        "type": "blob",
        "path": "src/components/fullcalendar/Calendar.svelte",
        "mode": "100644"
    },
    {
        "id": "816639e4c8425f68c5b2c839442db6519553b744",
        "name": "Draggable.svelte",
        "type": "blob",
        "path": "src/components/fullcalendar/Draggable.svelte",
        "mode": "100644"
    },
    {
        "id": "759551aae658f1627a536bc90885b841b4243642",
        "name": "FullCalendar.svelte",
        "type": "blob",
        "path": "src/components/fullcalendar/FullCalendar.svelte",
        "mode": "100644"
    },
    {
        "id": "b5002e150219d36cac1d9eb4ced9adedcc3c2249",
        "name": "helpers.js",
        "type": "blob",
        "path": "src/components/fullcalendar/helpers.js",
        "mode": "100644"
    },
    {
        "id": "55c1fd313764055db6f72d4352ca4fb2ca58bcdb",
        "name": "index.js",
        "type": "blob",
        "path": "src/components/fullcalendar/index.js",
        "mode": "100644"
    },
    {
        "id": "df3dd90e3ed2aba3c893b7384faf8dda1748dce1",
        "name": "AddPlayer.svelte",
        "type": "blob",
        "path": "src/components/orders/AddPlayer.svelte",
        "mode": "100644"
    },
    {
        "id": "5c26f6624b38c918d9a1ae35f9b625d4cd5310f3",
        "name": "OrderItemDetail.svelte",
        "type": "blob",
        "path": "src/components/orders/OrderItemDetail.svelte",
        "mode": "100644"
    },
    {
        "id": "212463dabf7e47c631ccfad9d86f02aa7a046a96",
        "name": "OrderItems.svelte",
        "type": "blob",
        "path": "src/components/orders/OrderItems.svelte",
        "mode": "100644"
    },
    {
        "id": "8a14639d7925aae2a41536d8b1ed16069bf1312f",
        "name": "PaymentDetail.svelte",
        "type": "blob",
        "path": "src/components/orders/PaymentDetail.svelte",
        "mode": "100644"
    },
    {
        "id": "e299b6f532c564d82bd6527c3e3d9e07e1d9d40d",
        "name": "PaymentItem.svelte",
        "type": "blob",
        "path": "src/components/orders/PaymentItem.svelte",
        "mode": "100644"
    },
    {
        "id": "5aed9a8ae68d1f3de55e4aca676a06b92375c33e",
        "name": "Players.svelte",
        "type": "blob",
        "path": "src/components/orders/Players.svelte",
        "mode": "100644"
    },
    {
        "id": "26257705122245af6372dc532ea4b84607e33dbb",
        "name": "ProgramDetail.svelte",
        "type": "blob",
        "path": "src/components/orders/ProgramDetail.svelte",
        "mode": "100644"
    },
    {
        "id": "6430241247d03706c5714a2d302c37c565960f76",
        "name": "localStorageHandler.js",
        "type": "blob",
        "path": "src/components/orders/localStorageHandler.js",
        "mode": "100644"
    },
    {
        "id": "cc6537b43dac78158c047b68307e3449d50d93f7",
        "name": "query_detailed_order_items.graphql",
        "type": "blob",
        "path": "src/components/orders/query_detailed_order_items.graphql",
        "mode": "100644"
    },
    {
        "id": "14a8836d9e53569f176dd2a65e988211fdbb9735",
        "name": "query_detailed_orders.graphql",
        "type": "blob",
        "path": "src/components/orders/query_detailed_orders.graphql",
        "mode": "100644"
    },
    {
        "id": "721c10f531463d5cd7d915492c9989fc0efd097a",
        "name": "AddProgramItems.svelte",
        "type": "blob",
        "path": "src/components/programs/AddProgramItems.svelte",
        "mode": "100644"
    },
    {
        "id": "574198101203e3c958d55f871019781fda83f4ce",
        "name": "EditProgram.svelte",
        "type": "blob",
        "path": "src/components/programs/EditProgram.svelte",
        "mode": "100644"
    },
    {
        "id": "4045407072754bc7f668bfec28bc22a31895eebf",
        "name": "EditProgramItem.svelte",
        "type": "blob",
        "path": "src/components/programs/EditProgramItem.svelte",
        "mode": "100644"
    },
    {
        "id": "7f5e17d0e6a20a1c6d4b498dad873f2a6c08ccc3",
        "name": "activityTypes.ts",
        "type": "blob",
        "path": "src/components/programs/activityTypes.ts",
        "mode": "100644"
    },
    {
        "id": "87f7ce61fa65c19eac21bb2531a629de66e3cbf2",
        "name": "AddActivity.svelte",
        "type": "blob",
        "path": "src/components/resources/AddActivity.svelte",
        "mode": "100644"
    },
    {
        "id": "516f53b79d1f04584cb772f7469942f186c8030b",
        "name": "AddResource.svelte",
        "type": "blob",
        "path": "src/components/resources/AddResource.svelte",
        "mode": "100644"
    },
    {
        "id": "caeedd84cac4986be641c86c754f2710ebe295b2",
        "name": "DetailDialogBody.svelte",
        "type": "blob",
        "path": "src/components/resources/DetailDialogBody.svelte",
        "mode": "100644"
    },
    {
        "id": "73ace2794831d25e1854f893d74950e1544a4717",
        "name": "EditResource.svelte",
        "type": "blob",
        "path": "src/components/resources/EditResource.svelte",
        "mode": "100644"
    },
    {
        "id": "947a1c1054a2137548f14566a12b6bac46ba0c2a",
        "name": "graphql.ts",
        "type": "blob",
        "path": "src/graphql.ts",
        "mode": "100644"
    },
    {
        "id": "0841b0aa1c242c8c45dcf37363e554f113ece202",
        "name": "index.js",
        "type": "blob",
        "path": "src/index.js",
        "mode": "100644"
    },
    {
        "id": "4b7b23943106f3a7a9e9f825d6bd32e58ec31088",
        "name": "loadActivityTypes.ts",
        "type": "blob",
        "path": "src/loadActivityTypes.ts",
        "mode": "100644"
    },
    {
        "id": "b93863b949ba446ef2beda34310e5873e84e45fa",
        "name": "loadCalendar.ts",
        "type": "blob",
        "path": "src/loadCalendar.ts",
        "mode": "100644"
    },
    {
        "id": "86a565d3057592b9ee9f7f966a298b84387a70ae",
        "name": "loadOrders.ts",
        "type": "blob",
        "path": "src/loadOrders.ts",
        "mode": "100644"
    },
    {
        "id": "19312d7012031547c69134914d61190ce7972355",
        "name": "localizationsHandler.js",
        "type": "blob",
        "path": "src/localizations/localizationsHandler.js",
        "mode": "100644"
    },
    {
        "id": "6f5a27699d39b333ffffd3d083791cfa0f281c2e",
        "name": "sk.js",
        "type": "blob",
        "path": "src/localizations/sk.js",
        "mode": "100644"
    },
    {
        "id": "0cb6b43cec2acf6c03b3bb090c4e4d94b5cec728",
        "name": "mutateOrderItem.graphql",
        "type": "blob",
        "path": "src/mutateOrderItem.graphql",
        "mode": "100644"
    },
    {
        "id": "9b732d0134f33db9164bc4846bb2b5989dead899",
        "name": "queryActivityTypes.graphql",
        "type": "blob",
        "path": "src/queryActivityTypes.graphql",
        "mode": "100644"
    },
    {
        "id": "6696b5929f416cf274d8afabe89b68e6d9365865",
        "name": "queryOrders.graphql",
        "type": "blob",
        "path": "src/queryOrders.graphql",
        "mode": "100644"
    },
    {
        "id": "4cb964e3e4d55dd437d37b108fc4530f038b6e27",
        "name": "querySearchCalendarEvent.graphql",
        "type": "blob",
        "path": "src/querySearchCalendarEvent.graphql",
        "mode": "100644"
    },
    {
        "id": "ae77b8cd3fb92256a7789c7d18af6c621c8dd1fe",
        "name": "ActivityTypes.js",
        "type": "blob",
        "path": "src/services/ActivityTypes.js",
        "mode": "100644"
    },
    {
        "id": "0f0e69815427f945cb4d02c16d4e94de9d54c710",
        "name": "Operations.js",
        "type": "blob",
        "path": "src/services/Operations.js",
        "mode": "100644"
    },
    {
        "id": "f807fa25352f66bdbb2d265149f6b1ac2a89b293",
        "name": "OperationsCopy.ts",
        "type": "blob",
        "path": "src/services/OperationsCopy.ts",
        "mode": "100644"
    },
    {
        "id": "c3d165e7c135a51b7e9dace11f2a68e497471eba",
        "name": "Players.js",
        "type": "blob",
        "path": "src/services/Players.js",
        "mode": "100644"
    },
    {
        "id": "294d9a1a225aa8a9abd0c50049090b66101d7589",
        "name": "loadActivityTypes.ts",
        "type": "blob",
        "path": "src/services/loadActivityTypes.ts",
        "mode": "100644"
    },
    {
        "id": "2753c86525e09f2d266edbd52bf5daa071ee686d",
        "name": "loadResources.ts",
        "type": "blob",
        "path": "src/services/loadResources.ts",
        "mode": "100644"
    },
    {
        "id": "a2790650facad0d4a248e5bcf0d96c002801812a",
        "name": "notPaidReports.ts",
        "type": "blob",
        "path": "src/services/notPaidReports.ts",
        "mode": "100644"
    },
    {
        "id": "823e4afe87a6a7ca87940725dde6a50d6f28d368",
        "name": "queryActivitiesByCalendarEvent.graphql",
        "type": "blob",
        "path": "src/services/queryActivitiesByCalendarEvent.graphql",
        "mode": "100644"
    },
    {
        "id": "480e88133c741c5932b0a51de22c8b995f48775c",
        "name": "queryCalenarEnums.graphql",
        "type": "blob",
        "path": "src/services/queryCalenarEnums.graphql",
        "mode": "100644"
    },
    {
        "id": "c83c44f5e0fec68454807bfdccac6e437878a32f",
        "name": "queryNenaplanovaneAktivity.graphql",
        "type": "blob",
        "path": "src/services/queryNenaplanovaneAktivity.graphql",
        "mode": "100644"
    },
    {
        "id": "32b96206928dd89c98462c7888def7f0e3468066",
        "name": "queryPaidReports.graphql",
        "type": "blob",
        "path": "src/services/queryPaidReports.graphql",
        "mode": "100644"
    },
    {
        "id": "612757e4e31b35d3f407f45f593a68c60ff758e8",
        "name": "queryReports.ts",
        "type": "blob",
        "path": "src/services/queryReports.ts",
        "mode": "100644"
    },
    {
        "id": "7b2b603e3794bc75fad086d0a59b6bcd877ca7bf",
        "name": "queryResourcesByCalendarEvent.graphql",
        "type": "blob",
        "path": "src/services/queryResourcesByCalendarEvent.graphql",
        "mode": "100644"
    },
    {
        "id": "ae4a2c15f386319d187e65fd416d88a53fbb7e93",
        "name": "query_NotPaidReports.graphql",
        "type": "blob",
        "path": "src/services/query_NotPaidReports.graphql",
        "mode": "100644"
    },
    {
        "id": "316a28e95fb9e2051633ca0fb8179cb49c985aca",
        "name": "query_PaidReports.graphql",
        "type": "blob",
        "path": "src/services/query_PaidReports.graphql",
        "mode": "100644"
    },
    {
        "id": "ffcd6b6496eae5cf787b889fef4765de927d272d",
        "name": "query_PlannedActivities.graphql",
        "type": "blob",
        "path": "src/services/query_PlannedActivities.graphql",
        "mode": "100644"
    },
    {
        "id": "1121d0fd924ff4dbeb3486ba5b2e426efdd4fff3",
        "name": "query_activity_types.graphql",
        "type": "blob",
        "path": "src/services/query_activity_types.graphql",
        "mode": "100644"
    },
    {
        "id": "c2ff22565398cd4a0144a1068a68e9d0aba8685d",
        "name": "query_activity_types_resources.graphql",
        "type": "blob",
        "path": "src/services/query_activity_types_resources.graphql",
        "mode": "100644"
    },
    {
        "id": "58b16d02a82985673a30d98da4e7096e65398a0e",
        "name": "query_doneActivities.graphql",
        "type": "blob",
        "path": "src/services/query_doneActivities.graphql",
        "mode": "100644"
    },
    {
        "id": "a981b2f1ab7f99bb29874958ebf32dadc420f77a",
        "name": "query_programs.graphql",
        "type": "blob",
        "path": "src/services/query_programs.graphql",
        "mode": "100644"
    },
    {
        "id": "3a1cee6c93ef7206d557c97ed23cd002eb5e27af",
        "name": "query_resources.graphql",
        "type": "blob",
        "path": "src/services/query_resources.graphql",
        "mode": "100644"
    },
    {
        "id": "9543c80edf0898b56d58b763ece3bc972c4567ec",
        "name": "query_units.graphql",
        "type": "blob",
        "path": "src/services/query_units.graphql",
        "mode": "100644"
    },
    {
        "id": "257b6e918dcbafde8a174c0d3244152995382ca0",
        "name": "query_units.ts",
        "type": "blob",
        "path": "src/services/query_units.ts",
        "mode": "100644"
    },
    {
        "id": "cf69e08b88cd3e0aab2a3e44b4769f738b2c7478",
        "name": "upsertPlannableOrder.ts",
        "type": "blob",
        "path": "src/services/upsertPlannableOrder.ts",
        "mode": "100644"
    },
    {
        "id": "a57bc86997bf14c8119602a768eb56dbdeb6bae8",
        "name": "upsert_activityTypes.graphql",
        "type": "blob",
        "path": "src/services/upsert_activityTypes.graphql",
        "mode": "100644"
    },
    {
        "id": "b2b39a2e11c20ec17fa771904b93398a9e97611b",
        "name": "upsert_activityTypes.ts",
        "type": "blob",
        "path": "src/services/upsert_activityTypes.ts",
        "mode": "100644"
    },
    {
        "id": "44fdc0b5b712dc9e461e1b64f46554f50115a8da",
        "name": "upsert_programs.graphql",
        "type": "blob",
        "path": "src/services/upsert_programs.graphql",
        "mode": "100644"
    },
    {
        "id": "9b771ec88556dd48dd427b5f464dfb04f3e7b96e",
        "name": "upsert_programs.ts",
        "type": "blob",
        "path": "src/services/upsert_programs.ts",
        "mode": "100644"
    },
    {
        "id": "b9b688b3ecbbe69fe84ddfead4da3e23957c4945",
        "name": "upsert_resource.ts",
        "type": "blob",
        "path": "src/services/upsert_resource.ts",
        "mode": "100644"
    },
    {
        "id": "7467a6a8dd32b831be17f89ca3ef963a787c65d7",
        "name": "upsert_resources.graphql",
        "type": "blob",
        "path": "src/services/upsert_resources.graphql",
        "mode": "100644"
    },
    {
        "id": "bdb5e287c8b3beeecff54eca961b4fc8bc68f721",
        "name": "types.d.ts",
        "type": "blob",
        "path": "src/types.d.ts",
        "mode": "100644"
    },
    {
        "id": "0522abb63b36c91ccf2965375dfdf642e4e878e0",
        "name": "updateOnlyCalendarEvent.graphql",
        "type": "blob",
        "path": "src/updateOnlyCalendarEvent.graphql",
        "mode": "100644"
    },
    {
        "id": "d1d60d642a60121ae32b75e44ce20e6b53f14cb6",
        "name": "upsertActivity.graphql",
        "type": "blob",
        "path": "src/upsertActivity.graphql",
        "mode": "100644"
    },
    {
        "id": "008233e15106ce7ec780007beb364bf78af29a05",
        "name": "upsertCalendar.ts",
        "type": "blob",
        "path": "src/upsertCalendar.ts",
        "mode": "100644"
    },
    {
        "id": "5c6904282bc2415b2021d3c0c6f735f56b4e5957",
        "name": "upsertCalendarEvents.graphql",
        "type": "blob",
        "path": "src/upsertCalendarEvents.graphql",
        "mode": "100644"
    },
    {
        "id": "32676bfc54e8e3105c1683912359ad386cc2ae9f",
        "name": "upsertCalendarResources.graphql",
        "type": "blob",
        "path": "src/upsertCalendarResources.graphql",
        "mode": "100644"
    },
    {
        "id": "44abf5bffdd4305aae1c7ee171da113ff418f869",
        "name": "upsertOrders.graphql",
        "type": "blob",
        "path": "src/upsertOrders.graphql",
        "mode": "100644"
    },
    {
        "id": "7b1ffbc54f86065df85805052fb61881513ba14e",
        "name": "upsertOrders.ts",
        "type": "blob",
        "path": "src/upsertOrders.ts",
        "mode": "100644"
    },
    {
        "id": "cc04bac4979ac467db4bd57a24585ceb8349a03d",
        "name": "svelte.config.js",
        "type": "blob",
        "path": "svelte.config.js",
        "mode": "100644"
    },
    {
        "id": "a2bb293410eae0dc5ae48d0c431c81ada641c6e6",
        "name": "tsconfig.json",
        "type": "blob",
        "path": "tsconfig.json",
        "mode": "100644"
    }
  ]