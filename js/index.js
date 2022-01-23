class Wordle {
    constructor(dictionaryWords) {
        this.availableWords = dictionaryWords || []
        this.keyboard = this.createKeyboard()
        this.word = ""
        this.previousWords = []
        this.board = this.createBoard()
        this.wordToBeGuessed = this.getRandomWord()
    }

    getRandomWord() {
        const key = Math.floor(Math.random() * this.availableWords.length + 1)
        return this.availableWords[key]
    }

    createKeyboard() {
        const keyboardNode = document.getElementById("keyboard")
        const keyboardKeys = ["qwertyuiop", "asdfghjklñ", "zxcvbnm"]
        const keyboard = {}
        keyboardKeys.forEach((line, idx) => {
            const lineNode = document.createElement("div")
            lineNode.id = `line-${idx}`
            for (const key of line) {
                keyboard[key] = {
                    button: this.createButton({
                        id: key,
                        text: key.toLocaleUpperCase(),
                        className: "letter",
                        parentNode: lineNode,
                    })
                }
            }
            keyboardNode.appendChild(lineNode)
        })

        // Add enter and delete buttons
        const lastLine = document.getElementById("line-2")
        keyboard.enter = {
            button: this.createButton({
                id: "enter",
                text: "INTRO",
                parentNode: lastLine,
            })
        }
        keyboard.delete = {
            button: this.createButton({
                id: "delete",
                text: "BORRAR",
            })
        }
        lastLine.prepend(keyboard.delete.button)
        return keyboard
    }

    createBoard() {
        const boardNode = document.getElementById("board")
        for (let line = 0; line < 6; line++) {
            const wordNode = document.createElement("div")
            for (let column = 0; column < 5; column++) {
                const letterNode = document.createElement("span")
                wordNode.appendChild(letterNode)
            }
            boardNode.appendChild(wordNode)
        }
        return boardNode
    }

    updateBoard() {
        const boardNode = this.board
        const wordsList = []
        for (const word of this.previousWords) {
            wordsList.push(word)
        }
        if (wordsList.length < 6) {
            wordsList.push(this.word)
        }
        for (let i = wordsList.length; i<6; i++) {
            wordsList[i] =  ""
        }
        
        for (const index in wordsList) {
            const word = wordsList[index]
            this.updateWordLine({
                word,
                node: boardNode.childNodes[index]
            })
        }
    }

    updateWordLine({ word, node }) {
        const showHints = this.previousWords.includes(word)
        for (let i=0; i<5; i++) {
            const letter = word[i] || ""
            const letterNode = node.childNodes[i]
            letterNode.innerHTML = letter.toLocaleUpperCase()
            if (showHints) {
                const className = this.wordToBeGuessed[i] === letter
                    ? "success"
                    : this.wordToBeGuessed.includes(letter)
                        ? "warning"
                        : ""
                letterNode.className = className
            }
        }
    }

    updateKeyboard() {
        for (const letter of this.word) {
            const key = this.keyboard[letter].button
            if (!this.wordToBeGuessed.includes(letter)) {
                key.classList.toggle("wrong", true)
            } else if (this.word.indexOf(letter) == this.wordToBeGuessed.indexOf(letter)) {
                key.classList.toggle("success", true)
                key.classList.toggle("warning", false)
            } else {
                key.classList.toggle("warning", true)
            }
        }
    }

    createButton({ id, text, parentNode, className }) {
        const button = document.createElement("button")
        if (id) button.id = id
        if (text) button.innerHTML = text
        if (className) button.className = className
        if (parentNode) parentNode.appendChild(button)
        button.addEventListener("click", () => {
            this.handleClick(id)
        })
        return button
    }

    handleClick(id) {
        switch (id) {
            case "enter":
                this.validateWord()
                break
            
            case "delete":
                this.deleteLastLetter()
                break
            
            default:
                this.addLetter(id)
                break
        }
        this.updateBoard()
    }

    validateWord() {
        if (this.word.length < 5) return
        if (this.availableWords.includes(this.word)) {
            this.previousWords.push(this.word)
            this.updateKeyboard()
            this.word = ""
        } else {
            this.word = ""
            alert("Esta palabra no me suena")
        }
        this.checkIfFinished()
    }

    addLetter(letter) {
        if (this.word.length === 5) return
        this.word += letter
    }

    deleteLastLetter() {
        if (this.word.length === 0) return
        this.word = this.word.slice(0, -1)
    }

    checkIfFinished() {
        const keyboardNode = document.getElementById("keyboard")
        const resultNode = document.getElementById("result")
        const resultMessageNode = document.getElementById("result-message")
        let resultMessage = ""
        if (this.previousWords.includes(this.wordToBeGuessed)) {
            // You won!
            resultMessage = "¡Has ganado el juego!"
        } else if (this.previousWords.length === 6) {
            // You lost!
            resultMessage = "¡Has perdido el juego!"
        }
        if (resultMessage) {
            keyboardNode.classList.toggle("hidden", true);
            resultNode.classList.toggle("hidden", false);
        }
        resultMessageNode.innerHTML = resultMessage;
        // You can keep playing
    }
}