export const render_step = (step: any, i: number, handle: any) =>
    {
        return (
            <div className={`${step.className} step`} key={`${i}-step_${step.className}`}>
                <h2>{step.title}</h2>
                <p>{step.desc}</p>
    
                {step.inputs.map((input: any, j: number)=> 
                (
                    render_input(input, j, handle)
                ))}
            </div>
        )
    } 
    
    export const render_input = (input: any, i: number, handle: any)=> 
    {
        if (input.type === 'radio')
        {  
            return (
                <div className={`radio-group ${input.name}`} key={`${i}-input_${input.name}`}>
                    <span>{input.label}</span>
    
                    <div className="radio-inputs">
                        {input.opcs?.map((opc: any, j: number)=>
                        (
                            <div className="r_input" key={`${j}-radio_${opc.value}`}>
                                <input
                                id={`${input.name}-${opc.value}`}
                                type="radio"
                                className='form-check-input'
                                name={input.name}
                                value={opc.value}
                                onChange={handle}
                                />
                                <label 
                                htmlFor={`${input.name}-${opc.value}`}
                                className='form-check-label'>{opc.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    
        else if (input.type === 'textarea')
        {
            return (
                <div className="mb-3 textarea" key={`${i}-input_${input.name}`}>
                    <label 
                    className="form-label"
                    htmlFor={`${input.name}`}>
                    {input.label}</label>
                    <textarea 
                    className="form-control"
                    id={`${input.name}`}
                    onChange={handle}
                    name={input.name}
                    />
                </div>
            )
        }
    
        else if (input.type === 'select')
        {
            return (
                <div className="mb-3 textarea" key={`${i}-input_${input.name}`}>
                    <span>{input.label}</span>
                    <select className="form-select">
                        <option selected >Selecione uma opção</option>
                        {input.opcs.map((opc: any, i: number)=>
                            <option value={opc.value} key={`${i}-select_${opc.value}`}>{opc.label}</option>
                        )}
                    </select>
                </div>
            )
        }
        
        else
        {
            return (
                <div className="mb-3" key={`${i}-input_${input.name}`}>
                    <label 
                    className="form-label"
                    htmlFor={`${input.name}`}>
                    {input.label}</label>
    
                    <input type={input.type} 
                    className="form-control"
                    id={`${input.name}`}
                    onChange={handle}
                    name={input.name}
                    />
                </div>
            )
        }
    }