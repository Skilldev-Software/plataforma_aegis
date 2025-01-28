export const steps = 
[
  {
    title: "Informções da Empresa",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-empresa',
    inputs:
    [
      { label: 'Nome da empresa:', type: 'text', name: 'nome' },
      { label: 'CNPJ da empresa:', type: 'text', name: 'cnpj' },
      { label: 'Site da empresa:', type: 'text', name: 'site' },
      { label: 'Email da empresa:', type: 'email', name: 'email'},
      { label: 'Contato da empresa:', type: 'text', name: 'contato'},
      { label: 'Fale sobre a empresa e a proposta:', type: 'textarea', name: 'coments'},

      { label: 'A empresa está em recuperação judicial?', name:'recuperacao_judicial', type: 'radio', 
        opcs: 
        [
          {label: 'Sim', value: 'sim', icon: 'FaThumbsUp'},
          {label: 'Não', value: 'nao', icon: 'FaThumbsDown'}
        ]
      },
      { label: 'A empresa possui balanço auditado?', name:'balanco_auditado', type: 'radio',
        opcs: 
        [
          {label: 'Sim', value: 'sim', icon: 'FaThumbsUp'},
          {label: 'Não', value: 'nao', icon: 'FaThumbsDown'}
        ]
      },
      { label: 'Setor de atuação da empresa:', name:'setor_atuacao', type: 'select', 
        opcs: 
        [
          { label: 'Agro', icon: 'FaSeedling', value: 'agro' },
          { label: 'Tecnologia', icon: 'FaLaptop', value: 'technologia' },
          { label: 'Varejo', icon: 'FaStore', value: 'varejo' },
          { label: 'Indústria', icon: 'FaIndustry', value: 'industria' },
          { label: 'Transporte e logística', icon: 'FaTruck', value: 'transporte_logistica' },
          { label: 'Atividades imobiliárias (Real State)', icon: 'FaHome', value: 'atvs_mobiliarias' },
          { label: 'Outros', icon: 'FaQuestionCircle', value: 'outros' }
        ]
      },
    ]
  },
  {
    title: "Garantias",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-garantias',
    inputs:
    [
      { label: "Quais são as garantias disponíveis?", type: "textarea", name: 'disponiveis' },
      { label: "Qual é o valor das garantias disponíveis?", type: "number", name: 'valor' },
    ] 
  },
  {
    title: "Informações Financeiras",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-financeiras',
    inputs:
    [
      { label: "Faturamento 2022:", type: "number", name: 'faturamento_2022' },
      { label: "Faturamento 2023:", type: "number", name: 'faturamento_2023' },
      { label: "Faturamento 2024:", type: "number", name: 'faturamento_2024' },
    ] 
  },
  {
    title: "A empresa possui dívidas?",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-dividas',
    inputs:
    [
      { label: 'Qual o valor total?', type: 'number', name: 'valor_total' },
      { label: 'Dívida tributária:', type: 'number', name: 'div_tributaria' },
      { label: 'Dívida bancária:', type: 'number', name: 'div_bancaria' }
    ] 
  },
  {
    title: "Documentação",
    desc: "Texto descrevendo a etapa.",
    className: 'infos-documentacao',
    inputs: 
    [
      { label: 'Faturamento 2022:', type: 'file', name: 'Faturamento 2022' },
      { label: 'Faturamento 2023:', type: 'file', name: 'Faturamento 2023' },
      { label: 'Faturamento 2024:', type: 'file', name: 'Faturamento 2024' },
      { label: 'Balançamento + DRE 2022:', type: 'file', name: 'Balançamento + DRE 2022' },
      { label: 'Balançamento + DRE 2023:', type: 'file', name: 'Balançamento + DRE 2023' },
      { label: 'Balançamento + DRE 2024:', type: 'file', name: 'Balançamento + DRE 2024' },
      { label: 'Contrato social ou última alteração contratual:', type: 'file', name: 'Contrato social' },
      { label: 'CNH ou RG dos sócios:', type: 'file', name: 'CNH-RG dos sócios' },
      { label: 'IRPF dos sócios (mais recente):', type: 'file', name: 'IRPF dos sócios' },
      { label: 'Outros:', type: 'file', name: 'Outros' },
    ]
  },
]