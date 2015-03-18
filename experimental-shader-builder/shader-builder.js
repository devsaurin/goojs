(function () {
	'use strict';

	function find(array, predicate) {
		for (var i = 0; i < array.length; i++) {
			if (predicate(array[i])) {
				return array[i];
			}
		}
	}

	function sort(graph) {
		var unvisited = new Set(graph.keys());
		var visited = new Set();
		var order = [];

		function df(nodeId) {
			if (visited.has(nodeId)) {
				return;
			}

			visited.add(nodeId);
			unvisited.delete(nodeId);

			graph.get(nodeId).outputsTo.filter(function (output) {
				return output.to !== '_';
			}).forEach(function (output) {
				df(output.to);
			});

			order.push(graph.get(nodeId));
		}

		while (unvisited.size) {
			df(unvisited.values().next().value);
		}

		return order;
	}

	// just converts a structure (array) to an map (id -> node)
	function toGraph(structure) {
		var graph = new Map();

		structure.forEach(function (node) {
			graph.set(node.id, node);
		});

		return graph;
	}

	// nodes are sorted
	function generateCode(nodeTypes, nodes) {
		function getInputVar(nodeId, varName) {
			return 'inp_' + nodeId + '_' + varName;
		}

		return nodes.map(function (node) {
			var nodeDefinition = nodeTypes[node.type];

			var isExternalInput = function (inputName) {
				if (!node.externalInputs) { return true; }

				return !node.externalInputs.some(function (externalInput) {
					return externalInput.name !== inputName;
				});
			};

			// declare the inputs of the node
			var copyIn = nodeDefinition.inputs.filter(function (input) {
				return isExternalInput(input.name);
			}).map(function (input) {
				return 'var ' + getInputVar(node.id, input.name) + '; // ' + input.type;
			}).join('\n');


			// declare outputs
			var outputDeclarations;
			if (nodeDefinition.outputs) {
				outputDeclarations = nodeDefinition.outputs.map(function (output) {
					return '\tvar ' + output.name + '; // ' + output.type;
				}).join('\n');
			} else {
				outputDeclarations = ''
			}

			// copy the outputs of this node to the inputs of the next node
			var copyOut = node.outputsTo.map(function (outputTo) {
				return '\t' + getInputVar(outputTo.to, outputTo.input) +
					' = ' + outputTo.output + ';';
			}).join('\n');


			// process inputs (from other shader's outputs)
			var processedBody = nodeDefinition.inputs.filter(function (input) {
				return isExternalInput(input.name);
			}).reduce(function (partial, input) {
				// should do a tokenization of the shader coder instead
				// this regex will fail for comments, strings
				return partial.replace(
					new RegExp('\\b' + input.name + '\\b', 'g'),
					getInputVar(node.id, input.name)
				);
			}, nodeDefinition.body);


			// process external inputs (direct uniforms)
			if (node.externalInputs) {
				processedBody = node.externalInputs.reduce(function (partial, input) {
					// should do a tokenization of the shader coder instead
					// this regex will fail for comments, strings
					return partial.replace(
						new RegExp('\\b' + input.name + '\\b', 'g'),
						input.external
					);
				}, processedBody);
			}

			return '// node ' + node.id + ', ' + node.type + '\n' +
				copyIn + '\n' +
				'(function () {\n' +
				outputDeclarations + '\n' +
				'\t' + processedBody + '\n'
				+ copyOut +
				'\n})();\n';
		}).join('\n');
	}

	function buildShader(types, structure) {
		var graph = toGraph(structure);
		var sorted = sort(graph);
		sorted.reverse(); // easier to reverse this than to invert the graph
		return generateCode(types, sorted);
	}

	window.shaderBits = window.shaderBits || {};
	window.shaderBits.buildShader = buildShader;
})();