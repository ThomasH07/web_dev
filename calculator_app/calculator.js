// const numberButtons = document.querySelectorAll(".number_button");
// const data = {
//   runningSum: "",
// };

// function updateView(elementId) {
//   document.getElementById(elementId).textContent = data.runningSum;
//   console.log("updating view", data.runningSum);
// }

// function updateRunningSum(value) {
//   data.runningSum += value;
//   updateView("runningSum");
// }

// numberButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     updateRunningSum(e.target.textContent);
//   });
// });

//nodes for the stack
class treeNode {
	constructor(val = null, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}
//
class ExpressionTree {
	//node
	constructor() {
        this.precedence = { '+': 1, '-': 1, '*': 2, '/': 2 }; // Higher means stronger precedence
    }
	isOperator(x) {
		return ['+', '-', '*', '/'].includes(x);
	}
	infixToPostfix(x) {
		let stack = []; // operator
		let output = []; // number
		let displaystring = x.split(''); 
		let currentNumber = '';
		for (let char of displaystring) {
			console.log("char: "+ char);
			if (char.match(/^\d+$/)) { // if its a number
				currentNumber += char;
			}else{
				if (currentNumber !== '') { // if there was a number collected, push it to the output
					//console.log("currentNumber: "+ currentNumber);
					output.push(currentNumber);
					currentNumber = ''; // Reset currentNumber
				}
				if (char === '(') {//deals with paranthesis
					stack.push(char);
				} else if (char === ')') {
					while (stack.length > 0 && stack[stack.length - 1] !== '(') {
						output.push(stack.pop());
					}	
					stack.pop();
				} 
				else if (this.isOperator(char)) { //if its a operator
					while (
						stack.length > 0 &&
						this.isOperator(stack[stack.length - 1]) &&
						this.precedence[stack[stack.length - 1]] >= this.precedence[char]
					) {
						output.push(stack.pop());
					}
					stack.push(char);
				}
			}
		}
	if (currentNumber !== '') {
		output.push(currentNumber);
	}
	while (stack.length > 0) {
		output.push(stack.pop());
	}
	return output.join(' '); 
}

	buildExpressionTree(post) {
		//console.log("postfix: " + post);
		let stack = [];
		let postfix = post.split(' ');
	
		for (let char of postfix) {
			if (!isNaN(char)) {
				stack.push(new treeNode(char));
				//console.log("character: " + stack[stack.length-1].val);
		  	} else if (this.isOperator(char)) {
				//console.log("check if operator:" + char);
				// pop two nodes from the stack and create a new node with operator
				let rightNode = stack.pop();
				let leftNode = stack.pop();
				console.log("check if left:" + leftNode.val);
				console.log("check if right:" + rightNode.val);
				let operatorNode = new treeNode(char, leftNode, rightNode);
				stack.push(operatorNode); // push the new operator node with values back to stack
		  	}
		}
		return stack.pop(); // The root node of the expression tree
	  }
	evaluateTree(node) {
		if (!node) {
			return 0;
		}	
		if (!node.left && !node.right) {
			return parseInt(node.val);
		}
		let leftValue = this.evaluateTree(node.left);  // Recursively evaluate the left subtree
		let rightValue = this.evaluateTree(node.right);  // Recursively evaluate the right subtree
		console.log("check if leftval:" + leftValue);
		console.log("check if rightval:" + rightValue);
		switch ((node.val)) {
		  case '+':
			return leftValue + rightValue;
		  case '-':
			return leftValue - rightValue;
		  case '*':
			return leftValue * rightValue;
		  case '/':
			return leftValue / rightValue;
			default:
				return("error");
		}
	  }
}