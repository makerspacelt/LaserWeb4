import React from 'react';
import { connect } from 'react-redux';

import Toggle from "react-toggle";
import 'react-toggle/style.css';
import '../styles/forms.css';

export function NumberField({object, field, description, units, setAttrs, dispatch, ...rest}) {
    return (
        <div className="input-group">
            <span className="input-group-addon">{description}</span>
            <input
                type="number"
                value={object[field]}
                onChange={e => dispatch(setAttrs({ [field]: Number(e.target.value) }, object.id))}
                {...rest}
                />
            <span className="input-group-addon">{units}</span>
        </div>
    );
}

export function TextField({object, field, description, units="", setAttrs, dispatch, ...rest}) {
    let isTextArea=typeof(rest.rows)!="undefined";
    
    return (
        <div className="input-group" style={(isTextArea)? {width: "100%"}:{}}>
            {(!isTextArea) ? (<span className="input-group-addon">{description}</span>): ( <label htmlFor={field}>{description}</label>)}
            {(!isTextArea) ? (
            <input
                type="text"
                value={object[field]}
                onChange={e => dispatch(setAttrs({ [field]: e.target.value }, object.id))}
                {...rest}
                />
            ) : (
               
                <textarea style={{width:"100%"}} id={field}
                onChange={e => dispatch(setAttrs({ [field]: e.target.value }, object.id))}
                value={object[field]}
                {...rest}
                ></textarea>
            )}
            {(units!=="")? (
                <span className="input-group-addon">{units}</span>
            ):(false)}
        </div>
    );
}

export function ToggleField({object, field, description, units="", setAttrs, dispatch, ...rest}) {
    return (
        <div className="input-group">
        <Toggle id={"toggle_"+object.id+"_"+field} defaultChecked={object[field]==true} onChange={e => dispatch(setAttrs({  [field]: e.target.checked }, object.id))} />
        <label htmlFor={"toggle_"+object.id+"_"+field}>{description}</label>
        </div>
    )    
}

export function QuadrantField({object, field, description, setAttrs, dispatch, ...rest}) {
    let radios=["TL","TR","C","BL","BR"];
    let available= new Set(rest.available ? rest.available : radios);
    let fields=radios.map((radio) =>
       <label  key={radio} className={radio}><input type="radio"  value={radio} name={"quadrant_"+field}
       checked={(object[field]==radio)? "checked":""}
       disabled={available.has(radio)? "":"disabled"}
       onChange={e => dispatch(setAttrs({ [field]: e.target.value }, object.id))} />
       </label>
    );
    
    return (
        <div className="input-group">
            <label>{description}</label>
            <div className="quadrantField">{fields}</div>
        </div>
    )
}



NumberField = connect()(NumberField);
TextField = connect()(TextField);
ToggleField = connect()(ToggleField);
QuadrantField = connect()(QuadrantField);