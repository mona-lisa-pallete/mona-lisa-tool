import React from 'react'
import RcColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import './index.less'

interface ColorPickerProps {
    value?: string;
    onChange?: () => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({value, onChange}) => {
  return (
      <div className="color-picker">
          <i className="icon-Typographycolor iconfont"></i>
            <RcColorPicker 
            color={'#36c'}
            alpha={30}
            placement="topLeft"
            className="some-class">
                <span className="rc-color-picker-trigger" />
            </RcColorPicker>
      </div>
  )
}
export default ColorPicker;