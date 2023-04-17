const modelToPrice/*: Record<OpenAIModel, number>*/ = {
    'ada': 0.0004,
    'babbage': 0.0005,
    'curie': 0.002,
    'davinci': 0.02,
    'text-ada-001': 0.0004,
    'text-babbage-001': 0.0005,
    'text-curie-001': 0.002,
    'text-davinci-001': 0.02,
    'text-davinci-002': 0.02,
    'text-davinci-003': 0.02,
    'code-cushman-001': 0.0,
    'code-davinci-002': 0.0,
    'gpt-3.5-turbo': 0.002
};


module.exports = {
    modelToPrice
}