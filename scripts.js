let expression = ""; // this is where the equation typed is stored to as a string
let answer = 0; // the current value saved in the answer slot
let slt1 = 0; // memory slot 1
let recover = ""; // equation is saved here and can be recovered
let str = false; // true is for save to slt1, false is for use slt1

function printToTyped(){
	// print to the typed display
	document.getElementById("equation").innerHTML = expression;
}

function printEqualSign(){
	// simply add "=" to the end of typed equation
	document.getElementById("equation").innerHTML = expression + " =";
}

function printToAns(){
	// indicate the value of ans when user requests it
	document.getElementById("ans").innerHTML = "ans = " + answer;
}

function printToAnswer(){
	document.getElementById("answer").innerHTML = answer;
}

function printError(){
	document.getElementById("answer").innerHTML = "error in expression";
}

function typeCharacter(c){
	// after each button click a new character is added
	expression += c;
	if(expression.length === 1){
		document.getElementById("answer").innerHTML = "";
		// first character typed, check if it was an operator that was typed
		if(expression[0] === "/" || expression[0] === "*" || expression[0] === "+" || expression[0] === "-"){
			// we selected an operator thus we are using the previous answer
			printToAns();
			expression = "ans" + expression;
		}
	}
	printToTyped();
}

function clearEquationChar(){
	if(expression.endsWith("ans")){
		// must remove three characters "ans"
		expression = expression.substring(0, expression.length - 3);
	}
	else{
		expression = expression.substring(0, expression.length - 1);
	}
	printToTyped();
}

function clearEquation(){
	expression = "";
	printToTyped();
}

function calculateAnswer(){
	printEqualSign();
	expression = expression.replace(/ans/g, answer.toString());
	// in these two while loops we are adding "*" between brackets as eval() doesn't like "(5)5" but will work on "(5)*5"
	// we check for a bracket and then check if the char beside it is a number, if so then interpet as multiplication
	let i = 0;
	while(i < expression.length){
		if(expression[i] === ")"){
			if(i < expression.length-1){
				if(!isNaN(expression[i+1])){
					// we can safely add "*"
					let exp = expression.slice(0, i+1) + "*" + expression.slice(i+1);
					expression = exp;
				}
			}
		}
		i++;
	}
	i = 0;
	while(i < expression.length){
		if(expression[i] === "("){
			if(i > 0){
				if(!isNaN(expression[i-1])){
					// we can safely add "*"
					exp = expression.slice(0, i) + "*" + expression.slice(i);
					expression = exp;
				}
			}
		}
		i++;
	}
	evaluateExpression();
}

function evaluateExpression(){
	// we need to check for any more brackets before computing a number
	if(expression === ""){
		// the user has clicked enter twice, just redo the expression
		recoverEquation();
		printEqualSign();
	}
	let sub_answer;
	try {
		sub_answer = eval(expression);
	} catch (error) {
		// the expression was not a number
		sub_answer = "error";
	}
	
	if(sub_answer != "error" && sub_answer != undefined){
		answer = sub_answer;
		printToAnswer();
		printToAns();
	}
	else{
		printError();
	}
	recover = expression;
	expression = "";	
}

function recoverEquation(){
	expression = recover;
	printToTyped();
}

function typePreviousAnswer(){
	if(expression.endsWith("ans")){
		// we assume multiplication
		expression += "*";
	}
	expression += "ans";
	printToTyped();
}

function toggleStoreRetrieve(){
	str = !str;
	if(str){
		document.getElementById("button_store").style.backgroundColor = "rgb(76, 175, 80)";
	}
	else{
		document.getElementById("button_store").style.backgroundColor = "rgb(175, 192, 237)";
		//document.getElementById("button_store").style.color = null;
	}
}

function slotOne(){
	if(str){
		slt1 = answer;
		//alert(slt1);
		str = false;
		document.getElementById("button_store").style.backgroundColor = "rgb(175, 192, 237)";
	}
	else{
		expression += slt1;
		printToTyped();
	}
}

// this function will be called after the DOM is loaded, use this to assign variables
document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("button_left_bracket").onclick = function() {typeCharacter("(")};
	document.getElementById("button_right_bracket").onclick = function() {typeCharacter(")")};
	document.getElementById("button_clear").onclick = function() {clearEquation()};
	document.getElementById("button_clear_entry").onclick = function() {clearEquationChar()};
	document.getElementById("button_seven").onclick = function() {typeCharacter("7")};
	document.getElementById("button_eight").onclick = function() {typeCharacter("8")};
	document.getElementById("button_nine").onclick = function() {typeCharacter("9")};
	document.getElementById("button_divide").onclick = function() {typeCharacter("/")};
	document.getElementById("button_four").onclick = function() {typeCharacter("4")};
	document.getElementById("button_five").onclick = function() {typeCharacter("5")};
	document.getElementById("button_six").onclick = function() {typeCharacter("6")};
	document.getElementById("button_multi").onclick = function() {typeCharacter("*")};
	document.getElementById("button_one").onclick = function() {typeCharacter("1")};
	document.getElementById("button_two").onclick = function() {typeCharacter("2")};
	document.getElementById("button_three").onclick = function() {typeCharacter("3")};
	document.getElementById("button_minus").onclick = function() {typeCharacter("-")};
	document.getElementById("button_zero").onclick = function() {typeCharacter("0")};
	document.getElementById("button_decimal").onclick = function() {typeCharacter(".")};
	document.getElementById("button_equal").onclick = function() {calculateAnswer()};
	document.getElementById("button_plus").onclick = function() {typeCharacter("+")};
	document.getElementById("button_ans").onclick = function() {typePreviousAnswer()};
	document.getElementById("button_store").onclick = function() {toggleStoreRetrieve()};
	document.getElementById("button_slot1").onclick = function() {slotOne()};
	document.getElementById("button_recover").onclick = function() {recoverEquation()};
	document.getElementById("button_store").style.backgroundColor = "rgb(175, 192, 237)";
});



