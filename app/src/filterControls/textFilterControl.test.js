import TextFilterStore from './TextFilterStore';
import ReactDOM from 'react-dom';
import React from 'react';
import { mount , render} from 'enzyme';
import TextFilterControl from './textFilterControl';
import renderer from 'react-test-renderer';
const fullCrtiterionState = {
    currentCriterion: {
        values: "textxt"
    },
    config: {
        label: "amro",
        watermark: "test" 
    },
    controlId: "test filter",
    onFilterControlChange : function(selectedValue, controlId){
        return ({
            selectedValue : selectedValue,
            controlId: controlId
        })
    }
}
describe('Allow the user to filter data by typing text', ()=>{
    describe('Text field should contain predfined crtiretrion value', () => {
        it('Unit test for TextFilterStore.getCurrentValue: verfiy that getCurrentValue knows to return amro', () => {
            let criterionState1 = {
                currentCriterion: {
                    values: "amro"
                }
            }
            expect(TextFilterStore.getCurrentValue(criterionState1)).toBe("amro");
        })
        it('Unit test for TextFilterStore.getCurrentValue: verfiy that getCurrentValue knows to return mattan', () => {
            let criterionState2 = {
                currentCriterion: {
                    values: "mattan"
                }
            }
            expect(TextFilterStore.getCurrentValue(criterionState2)).toBe("mattan");
        })
        it('Unit test for TextFilterStore.getCurrentValue: verfiy that getCurrentValue knows to return minor', () => {
            let criterionState3 = {
                currentCriterion: {
                    values: "minor"
                }
            }
            expect(TextFilterStore.getCurrentValue(criterionState3)).toBe("minor");
        })
        it('Unit test for TextFilterStore.getCurrentValue: verfiy that getCurrentValue knows to return empty string when current value is not supplied', () => {
            expect(TextFilterStore.getCurrentValue({})).toBe("");
        })
    });
})

describe('Allow the user to filter data by typing text', ()=>{
    describe('Text area in the rendered component should contain predfined crtiretrion value', ()=> {
        it('Render textControlFilter - text area contains the predefined text - textxt', ()=>{
            const wrapper = mount(
                <TextFilterControl 
                    controlId={fullCrtiterionState.controlId}
                    onFilterControlChange={fullCrtiterionState.onFilterControlChange}
                    currentCriterion={fullCrtiterionState.currentCriterion} 
                    config={fullCrtiterionState.config} 
                />
            );
            const input = wrapper.find('input').get(0);
            expect(input.value).toBe("textxt");
        })
    });
    describe('Text area in the rendered component should contain the changed value', ()=>{
        const onChange = jest.fn();
        it('input area calls on change function when changed text value with the correct parameters', ()=>{
            const wrapper = mount(
                <TextFilterControl 
                    controlId={fullCrtiterionState.controlId}
                    onFilterControlChange={onChange}
                    currentCriterion={fullCrtiterionState.currentCriterion} 
                    config={fullCrtiterionState.config} 
                />
            );
            const input = wrapper.find('input');
            input.get(0).value = 'liron';
            input.simulate('change');
            input.get(0).value = 'zoobar';
            input.simulate('change');
            expect(onChange.mock.calls[0][0]).toEqual({"values": "liron"});
            expect(onChange.mock.calls[0][1]).toBe("test filter");
            expect(onChange.mock.calls[1][0]).toEqual({"values": "zoobar"});
            expect(onChange.mock.calls[1][1]).toBe("test filter");
        })
    });
     
})

describe('Allow the developer to make sure his code changes did not change the dom tree of textFilterControl', ()=>{
    it('renders text filter control and make sure its dom tree did not change', ()=>{
        const textControl = renderer.create(<TextFilterControl  {...fullCrtiterionState}
         />).toJSON();
        expect(textControl).toMatchSnapshot();
    })
})
