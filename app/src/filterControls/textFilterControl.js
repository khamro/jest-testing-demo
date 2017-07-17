import React from 'react';
import FilterControl from './filterControl';
import isEmpty from 'lodash/isEmpty';
import TextFilterStore from './textFilterStore';
class TextFilterControl extends FilterControl{ 

    handleChange(event){

        let selectedValue = {};
        if (!isEmpty(event.target.value)){
            selectedValue.values = event.target.value;
        }
        
        this.props.onFilterControlChange(selectedValue, this.props.controlId);
    }

    getCurrentValue(){
        let value = '';

        if (!isEmpty(this.props.currentCriterion) && !isEmpty(this.props.currentCriterion.values)){
            value = this.props.currentCriterion.values;
        }
        return value;
    }

    render(){
        let value = TextFilterStore.getCurrentValue(this.props);
        
        let className = "text-filter-control " + this.props.controlId;
        
        return (
            <div className={className}>
                <div className="label">{this.props.config.label}</div>
                <input 
                    className="test-polina"
                    value={value}
                    onChange={TextFilterStore.handleChange.bind(this)} 
                    placeholder = {this.props.config.watermark} 
                    type="text">
                </input>
            </div>
        );
    }
}
export default TextFilterControl;