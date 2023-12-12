const display = document.getElementById ('inp');
const mem_display = document.getElementById ('memory');
const operationsDisplay = document.getElementById ('opDisplay');

let OnOffCalcDevice = false;

let result = "";
let memory = "";
let mrc_count = 0;

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => KeyProcessing(event));

function backspace ()
{
    if (!OnOffCalcDevice) return;

    display.value = display.value.slice (0, -1);
    operationsDisplay.innerText = operationsDisplay.innerText.slice (0, -1);
    if (display.value == "") display.value = "0";
    mrc_count = 0;
}

function AddDigits (digit)
{   
    if (!OnOffCalcDevice) return;
    // проверка на количество вхождений точки
    if([...display.value].filter(l => l === '.').length >= 1 && digit == ".") return;

    let op = operationsDisplay.innerText.slice(-1);
    if (op === '+' || op === '-' || op === '*' || op === '/' || op === '%')
        display.value = "";
    if (display.value.length <= 10)
    {
        if (digit === "00" && display.value === "0")
        {
            return;
        }
        if (display.value === "0")
        {
            display.value = "";
        }
        display.value += digit;
        result += digit;
        operationsDisplay.innerText += digit;
    }
    mrc_count = 0;
}

function OnOff ()
{
    if (!OnOffCalcDevice)
    {
        OnOffCalcDevice = !OnOffCalcDevice;
    }
    if (OnOffCalcDevice)
    {
        display.value = 0;
    }
    
    result = "";
    operationsDisplay.innerText = "";
    mrc_count = 0;
}

function DisplayClean ()
{
    if (!OnOffCalcDevice) return;
    display.value = "0";
    result = "";
    operationsDisplay.innerText = "";
}

function MemoryDisplayClean ()
{
    if (!OnOffCalcDevice) return;
    mrc_count++;
    if (mrc_count === 1)
    {
        str = memory === "" ? "0": memory.toString();
        display.value = (str.length > 15)? str.slice(0,15) : str;
        result = memory;
        operationsDisplay.innerText = memory;
    }
    else
    {
        memory = "";
        mrc_count = 0;
        HideMemoryButton();
    }
}

function MemoryAdd()
{
    if (!OnOffCalcDevice) return;
    if (display.value === "" || memory === "")
        memory = display.value;
    else
        memory = eval(memory.toString() + "+" + display.value);
    ShowMemoryButton();
    }

function MemorySub()
{
    if (!OnOffCalcDevice) return;
    memory = (memory === "") ? "0" : memory;
    memory = eval(memory + "-" + display.value);
    ShowMemoryButton();
}

function ShowMemoryButton()
{
    mem_display.style.visibility = "visible";
}

function HideMemoryButton()
{
    mem_display.style.visibility = "hidden";
}

function KeyProcessing (event) {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        AddDigits(event.key);
    }
    else if (event.key === 'Backspace') 
        backspace();
    else if (event.key === 'Escape')
        DisplayClean();
    else if (event.key === 'Enter')
        Calculate();
    else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '%')
        _SetValue(event.key);
    console.log(event.key);
}

function Calculate()
{
    if (!OnOffCalcDevice) return;
    result = result.replace("%", "/100");
    let str = eval(result).toString();
    display.value = (str.length > 15)? str.slice(0,15) : str;
    operationsDisplay.innerText = result + "=" + display.value;
    mrc_count = 0;
}

function _SetValue(operation)
{
    // result = result + operation
    result += operation;
    operationsDisplay.innerText = result;
    mrc_count = 0;
}

function ChangeSign()
{
    let res = eval("-1*" + display.value);
    if (operationsDisplay.innerText.endsWith(display.value))
    {
        operationsDisplay.innerText = operationsDisplay.innerText.replaceLast(display.value, res);
        result = result.replaceLast(display.value, res);
    }
    display.value = res;
    mrc_count = 0;
}

String.prototype.replaceLast = function(searchValue, replaceValue) {
    const lastOccurrenceIndex = this.lastIndexOf(searchValue)
    return `${this.slice(0, lastOccurrenceIndex)}(${replaceValue})${this.slice(lastOccurrenceIndex + searchValue.length)}`;
  }
