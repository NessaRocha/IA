const readline = require("readline");

// List of Possible Answers
const possibleAnswersArray = [
	"Gisele Bündchen",
	"Margot Robbie",
	"Hortência (Basketball Player)",
	"Neymar",
	"Ayrton Senna",
	"Cauã Reymond",
	"Goku",
	"Naruto",
	"Daffy Duck",
	"Dog",
	"Elephant",
	"Cat",
	"Bus",
	"Truck",
	"Airplane",
	"Ship",
	"Other Category",
];

// Recursive Question Structure
const questions = {
	question:
		"Think of one of the options listed below and I'll try to guess what it is.",
	subElement: {
		yes: {
			question: "Is it a human being?",
			subElement: {
				yes: {
					question: "Is it a woman?",
					subElement: {
						yes: {
							question: "Is she a model?",
							subElement: {
								yes: {
									answer: "Gisele Bündchen",
								},
								no: {
									question: "Is she an actress?",
									subElement: {
										yes: {
											answer: "Margot Robbie",
										},
										no: {
											answer: "Hortência (Basketball Player)",
										},
									},
								},
							},
						},
						no: {
							question: "Is it a man?",
							subElement: {
								yes: {
									question: "Does he play soccer?",
									subElement: {
										yes: {
											answer: "Neymar",
										},
										no: {
											question: "Is he a driver?",
											subElement: {
												yes: {
													answer: "Ayrton Senna",
												},
												no: {
													answer: "Cauã Reymond",
												},
											},
										},
									},
								},
								no: {
									answer: "Another human being",
								},
							},
						},
					},
				},
				no: {
					question: "Is it an animated character?",
					subElement: {
						yes: {
							question: "Is it from Dragon Ball?",
							subElement: {
								yes: {
									answer: "Goku",
								},
								no: {
									question: "Is it from Naruto?",
									subElement: {
										yes: {
											answer: "Naruto",
										},
										no: {
											answer: "Daffy Duck",
										},
									},
								},
							},
						},
						no: {
							question: "Is it an animal?",
							subElement: {
								yes: {
									question: "Is it man's best friend?",
									subElement: {
										yes: {
											answer: "Dog",
										},
										no: {
											question: "Is it big?",
											subElement: {
												yes: {
													answer: "Elephant",
												},
												no: {
													answer: "Cat",
												},
											},
										},
									},
								},
								no: {
									question: "Is it a vehicle?",
									subElement: {
										yes: {
											question: "Is it terrestrial?",
											subElement: {
												yes: {
													question: "Is it used for public transportation?",
													subElement: {
														yes: {
															answer: "Bus",
														},
														no: {
															answer: "Truck",
														},
													},
												},
												no: {
													question: "Is it aerial?",
													subElement: {
														yes: {
															answer: "Airplane",
														},
														no: {
															answer: "Ship",
														},
													},
												},
											},
										},
										no: {
											answer: "Other Category",
										},
									},
								},
							},
						},
					},
				},
			},
		},
		no: {
			answer: "I couldn't guess. Try again!",
		},
	},
};

// Inference Engine
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Recursive Function to Ask Questions
async function ask(currentQuestion) {
	return new Promise((resolve) => {
		rl.question(
			`${currentQuestion.question} (1 for YES, 2 for NO): `,
			async (response) => {
				response = response.trim();

				if (response === "1") {
					if (currentQuestion.subElement.yes.answer) {
						console.log(
							`\nThe answer is: ${currentQuestion.subElement.yes.answer}\n`
						);
						resolve();
					} else if (currentQuestion.subElement.yes.question) {
						await ask(currentQuestion.subElement.yes);
						resolve();
					} else {
						console.log("\nNo answer defined for YES.");
						resolve();
					}
				} else if (response === "2") {
					if (currentQuestion.subElement.no) {
						if (currentQuestion.subElement.no.answer) {
							console.log(
								`\nThe answer is: ${currentQuestion.subElement.no.answer}\n`
							);
							resolve();
						} else if (currentQuestion.subElement.no.question) {
							await ask(currentQuestion.subElement.no);
							resolve();
						} else {
							console.log("\nNo answer defined for NO.");
							resolve();
						}
					} else {
						console.log("\nUnrecognized response. Please try again.");
						await ask(currentQuestion);
						resolve();
					}
				} else {
					console.log("\nInvalid input. Please enter 1 for YES or 2 for NO.");
					await ask(currentQuestion);
					resolve();
				}
			}
		);
	});
}

// Start Function
async function start() {
	console.log("\nWelcome to the guessing game!\n");

	// Display the list of options
	console.log(
		"Think of one of the options below and I'll try to guess what it is:\n"
	);
	possibleAnswersArray.forEach((answer, index) => {
		console.log(`${index + 1}. ${answer}`);
	});
	console.log("\n");

	// Start the questioning process
	await ask(questions);
	rl.close();
}

start();
