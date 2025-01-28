export const steps = 
[
  {
    title: "Informções da Empresa",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-empresa',
    inputs:
    [
      { label: 'Nome do cliente:', type: 'text', name: 'nome' },
      { label: 'Faturamento/Renda Mensal:', type: 'number', name: 'faturamento' },
      { label: 'Profissão do cliente:', type: 'text', name: 'profissao' },
      { label: 'Idade do cliente:', type: 'text', name: 'idade'},
      { label: 'CPF do cliente:', type: 'text', name: 'cpf'},
      { label: 'Qual é a rentabilidade média esperada mensalmente?', type: 'number', name: 'rentabilidade_esperada'},
      { label: 'Onde o cliente mora?', type: 'text', name: 'moradia'},
      { label: 'Campo de comentário livre:', type: 'textarea', name: 'coments'},

      { label: 'Qual é o estado civil do cliente?', name:'estado_civil', type: 'radio', 
        opcs: 
        [
          {label: 'Solteiro(a)', value: 'solteiro' },
          {label: 'Casado(a)', value: 'casado' },
          {label: 'Divorciado(a)', value: 'divorciado' },
          {label: 'Viúvo(a)', value: 'viuvo' }
        ]
      },
      { label: 'Cliente é investidor profissional ou qualificado?', name:'profissional_qualificado', type: 'radio', 
        opcs: 
        [
          {label: 'Investidor Profissional', value: 'profissional' },
          {label: 'Investidor Qualificado', value: 'qualificado' }
        ]
      },
      { label: 'Cliente é Pessoa Física ou Jurídica?', name:'fisico_juridico', type: 'radio', 
        opcs: 
        [
          {label: 'Pessoa Física', value: 'fisica', },
          {label: 'Pessoa Jurídica', value: 'juridica', }
        ]
      },
      { label: 'Cliente já investe?', name:'cliente_investe', type: 'radio',
        opcs: 
        [
          {label: 'Sim', value: 'sim' },
          {label: 'Não', value: 'nao' }
        ]
      },
      { label: 'Em caso de resposta afirmativa, quanto o cliente tem aplicado?', type: 'number', name: 'quant_aplicado'},
    ]
  },
  {
    title: "Documentação",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-documentacao',
    inputs: 
    [
      { label: 'Documento:', type: 'file', name: 'Documento' }
    ]
  },
]