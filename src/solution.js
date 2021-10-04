function charIsNumber(elem) {
    return "0123456789.".indexOf(elem) !== -1
}

function stringIsNumber(str) {
    let i = 0
    while (i < str.length && charIsNumber(str[i])) {
        i++
    }
    return i === str.length
}

function infToPost(expressionInInfix) {
    let prec = {"*": 3, "/": 3, "+": 2, "-": 2, "(": 1},
        postfixList = [],
        tokenList = expressionInInfix,
        opStack = []
    for (let i = 0; i < tokenList.length; i++) {
        if (stringIsNumber(tokenList[i])) {
            postfixList.push(tokenList[i])
        } else if (tokenList[i] === "(") {
            opStack.push(tokenList[i])
        } else if (tokenList[i] === ")") {
            let topToken = opStack.pop()
            while (topToken !== "(") {
                postfixList.push(topToken)
                topToken = opStack.pop()
            }
        } else {
            while (opStack.length !== 0 && prec[opStack[opStack.length - 1]] >= prec[tokenList[i]]) {
                postfixList.push(opStack.pop())
            }
            opStack.push(tokenList[i])
        }
    }
    while (opStack.length !== 0) {
        postfixList.push(opStack.pop())
    }
    return postfixList
}

function res(stack, elem) {
    if (stringIsNumber(elem)) {
        return parseFloat(elem)
    } else if (stack.length > 1) {
        let x = stack.pop(),
            y = stack.pop()
        if (!parseFloat(x) || !parseFloat(y)) {return "err"}
        switch (elem) {
            case "+":
                return x + y
            case "-":
                return y - x
            case "*":
                return x * y
            case "/":
                return y / x
            default:
                return parseFloat(elem)
        }
    } else {return "err"}
}

function calculate(expression) {
    let stack = []
    for (let i = 0; i < expression.length; i++) {
        stack.push(res(stack, expression[i]))
    }
    if (stack.length === 1) {
        return stack[0]
    } else {
        return "err"
    }
}

function parseExpression(expression) {
    let parsedExpression = [],
        i = 0,
        currentNumber = ""
    while (i < expression.length) {
        if (charIsNumber(expression[i])) {
            while (i !== expression.length && charIsNumber(expression[i])) {
                currentNumber += expression[i]
                if (i < expression.length - 1 && charIsNumber(expression[i + 1])) i++
                else {break}
            }
            parsedExpression.push(currentNumber)
            currentNumber = ""
        } else {
            parsedExpression.push(expression[i])
        }
        i++
    }
    return parsedExpression
}

function solution(expression) {
    let array = parseExpression(expression),
        postfixExpression = infToPost(array)
    return calculate(postfixExpression)
}

export default solution