const { Builder, Capabilities, By } = require("selenium-webdriver")

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
    
});


// Chalon test below.

test("Upper-left corner, click.", async () => {
    let corner = driver.findElement(By.id("cell-0"))
    await corner.click()
    expect(await corner.getText()).toBe("X")
});

test("Upper-right corner, click.", async () => {
let corner = driver.findElement(By.id("cell-2"))
    await corner.click()
    expect(await corner.getText()).toBe("X")
});

test("Bottom-right corner, click.", async () => {
let corner = driver.findElement(By.id("cell-8"))
    await corner.click()
    expect(await corner.getText()).toBe("X")
});

const getCellName = (num) => {
    if (num === 0){return "top-left"}
    else if (num === 1){return "top-middle"}
    else if (num === 2){return "top-right"}
    else if (num === 3){return "middle-left"}
    else if (num === 4){return "center"}
    else if (num === 5){return "middle-right"}
    else if (num === 6){return "bottom-left"}
    else if (num === 7){return "bottom-middle"}
    else if (num === 8){return "bottom-right"}
};


const consoleCellsWithOs = (arr) => {
    if (arr.length === 1){return `The ${getCellName(arr[0])} cell has an "O".`}
    else if (arr.length === 0){return `There are no O's on the board. RIP O's.`}
    else if (arr.length === 2){return `The ${getCellName(arr[0])} and the ${getCellName(arr[1])} both have O's.`}
    else if (arr.length > 2){
        let cellArr = [];
        for (let i=1; i < arr.length-1; i++){
            cellArr.push(` the ${getCellName(arr[i])} cell,`)
        };
        return `The ${getCellName(arr[0])} cell, ${cellArr.join("")}, and the ${getCellName(arr[arr.length-1])} cell all have O's.`
    };
};



test("Check that an 'O' is placed on board after user moves.", async () => {
    let isThereO = false
    let squaresWithO = []
    for (i=0; i < 8; i++){
        if ((await driver.findElement(By.id(`cell-${i}`)).getText()).toLowerCase() === "o"){
            squaresWithO.push(i)
            isThereO = true
        }
    }
    expect(isThereO).toBe(true)



    console.log(consoleCellsWithOs(squaresWithO))
    console.log(consoleCellsWithOs([0,1,2,3,4]))
})