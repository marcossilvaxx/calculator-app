import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity} from 'react-native';

export default function App() {
	const [calc, setCalc] = useState('');

	function calculate(){
		let result = 0;
		let number = "";
		let numbers = [];
		let operators = [];
		for (let i=0; i < calc.length; i++) {
			if(!(isNaN(calc[i]))){
				number += calc[i];
				if(i == calc.length-1){ // da errado quando a conta começa e termina com o mesmo numero. Trocar pro for convencional pra saber quando estiver no ultimo loop
					numbers.push(number);
				}
			}else{
				numbers.push(number);
				number = "";
				operators.push(calc[i]);
			}
		}

		console.log(numbers);
		console.log(operators);

		let expression = joinCalc(numbers, operators);

		console.log(expression);

		
		while(expression.indexOf("*") !== -1 || expression.indexOf("/") !== -1){
			let index1 = expression.indexOf("*");
			let index2 = expression.indexOf("/");

			console.log("Indice *:", index1);
			console.log("Indice /:", index2);

			let operations = [index1, index2].sort();

			for (const index of operations) {
				if(index !== -1 && index === index1){
					index1 = expression.indexOf("*");
					expression.splice(index1-1, 3, parseFloat(expression[index1-1]) * parseFloat(expression[index1+1]));
					console.log("Depois da multiplicação " + expression);
				}else if(index !== -1 && index === index2){
					index2 = expression.indexOf("/");
					expression.splice(index2-1, 3, parseFloat(expression[index2-1]) / parseFloat(expression[index2+1]));
					console.log("Depois da divisão: " + expression);
				}
			}
		}

		for(let i=0; i < expression.length; i++){
			console.log("Indice:", i);
			console.log("Tamanho lista:", expression.length);
			if(expression[i] === "+"){
				expression.splice(i-1, 3, parseFloat(expression[i-1]) + parseFloat(expression[i+1]));
				i = 0;
			}else if(expression[i] === "-"){
				expression.splice(i-1, 3, parseFloat(expression[i-1]) - parseFloat(expression[i+1]));
				i = 0;
			}

		}

		setCalc(expression[0]);

		console.log(expression);
	}

	function joinCalc(numbers, operators){
		let expression = [];
		
		for (let i=0; i < numbers.length; i++) {
			const number = numbers[i];
			expression.push(number);
			expression.push(operators[i]);			
		}

		expression = expression.filter(e => e != undefined);

		return expression;
	}

	function sortOperators(listOperators){

	}

  	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.display}>
	  		<Text style={styles.textDisplay}>{calc}</Text>
			</View>
			<View style={styles.buttons}>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '7')}><Text style={styles.textButton}>7</Text></TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '8')}><Text style={styles.textButton}>8</Text></TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '9')}><Text style={styles.textButton}>9</Text></TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.buttonOperation]} onPress={() => setCalc(calc + '/')}><Text style={styles.textButton}>/</Text></TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '4')}><Text style={styles.textButton}>4</Text></TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '5')}><Text style={styles.textButton}>5</Text></TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '6')}><Text style={styles.textButton}>6</Text></TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.buttonOperation]} onPress={() => setCalc(calc + '*')}><Text style={styles.textButton}>*</Text></TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '1')}><Text style={styles.textButton}>1</Text></TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '2')}><Text style={styles.textButton}>2</Text></TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => setCalc(calc + '3')}><Text style={styles.textButton}>3</Text></TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.buttonOperation]} onPress={() => setCalc(calc + '-')}><Text style={styles.textButton}>-</Text></TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => setCalc(calc + '0')}><Text style={styles.textButton}>0</Text></TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.buttonOperation]} onPress={calculate}><Text style={styles.textButton}>=</Text></TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.buttonOperation]} onPress={() => setCalc(calc + '+')}><Text style={styles.textButton}>+</Text></TouchableOpacity>
			</View>
		</SafeAreaView>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
	},

	display: {
		backgroundColor: '#e3e3e3',
		height: 200,
		alignSelf: 'stretch',
		marginHorizontal: 30,
		justifyContent: 'flex-end'
	},

	buttons: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#ccc',
		height: 280,
		marginHorizontal: 30
	},

	button: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 70,
		height: 70,
		backgroundColor: '#c7b8fc',
	},

	zeroButton: {
		flexGrow: 7
	},

	textButton: {
		fontSize: 20,
	},

	buttonOperation: {
		backgroundColor: '#8471c9'
	},

	textDisplay: {
		alignSelf: 'flex-end',
		margin: 30,
		fontSize: 40,
		textAlign: 'right'
	}
});
