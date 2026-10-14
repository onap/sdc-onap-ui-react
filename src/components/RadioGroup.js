import React from 'react';
import Radio from './Radio.js';

class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.radios = {};
    }

    render() {
        let { name, disabled, title, options, value, className } = this.props;
        let dataTestId = this.props['data-test-id'];
        return (
            <fieldset
                data-test-id={dataTestId}
                className={`sdc-radio-group ${className || ''}`}>
                {title && (
                    <legend className="sdc-radio-group__legend">{title}</legend>
                )}
                <div className="sdc-radio-group__radios">
                    {options.map(option => {
                        let rName = name + '_' + option.value;
                        return (
                            <Radio
                                ref={radio => {
                                    this.radios[rName] = radio;
                                }}
                                data-test-id={dataTestId + '_' + option.value}
                                key={rName}
                                value={option.value}
                                label={option.label}
                                checked={value === option.value}
                                disabled={disabled}
                                name={name}
                                onChange={() => this.onChange(rName)}
                            />
                        );
                    })}
                </div>
            </fieldset>
        );
    }

    onChange(rName) {
        let { onChange } = this.props;
        let val = this.radios[rName].getValue();
        if (onChange) {
            onChange(val);
        }
    }

    getValue() {
        return this.props.value;
    }
}

export default RadioGroup;
