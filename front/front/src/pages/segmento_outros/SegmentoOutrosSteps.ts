export const steps = [
  {
    title: "Informações da Empresa",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-empresa',
    inputs: [
      { label: 'Nome do cliente:', type: 'text', name: 'nome' },
      { label: 'Email do cliente:', type: 'email', name: 'email' },
      { label: 'Contato do cliente (empresário ou financeiro):', type: 'text', name: 'contato' },
      { label: 'Proposta do cliente:', type: 'textarea', name: 'coments' },

      { 
        label: 'Cliente é Pessoa Física ou Jurídica?', 
        name: 'tipo_cliente', 
        type: 'radio', 
        opcs: [
          { label: 'Pessoa Física', value: 'fisica' },
          { label: 'Pessoa Jurídica', value: 'juridica' }
        ]
      },
      
      { 
        label: 'Qual é o tipo de operação?', 
        name: 'tipo_operacao', 
        type: 'select', 
        opcs: [
          { label: 'Seguro', value: 'seguro' },
          { label: 'Consórcio', value: 'consorcio' },
          { label: 'Financiamento', value: 'financiamento' },
          { label: 'Capitalização', value: 'capitalizacao' },
          { label: 'Consignado', value: 'consignado' },
        ]
      },
    ]
  },
  {
    title: "Documentação",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-documentacao',
    inputs: [
      { label: 'Documento:', type: 'file', name: 'documento' }
    ]
  },
];
