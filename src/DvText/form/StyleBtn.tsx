import { Button, InputNumber, Popover, Slider } from 'antd';
import React, { CSSProperties, useState } from 'react'
import "./stylebtn.less"

interface StyleBtnProps {
    letterSpacing: number
    lineHeight: number
    fontWeightVal: boolean
    fontStyleVal: boolean
    textDecorationVal: boolean
    onChangeStyle: (css: CSSProperties) => void
    value: any
    onChange: (data: any) => void
}

const StyleBtn: React.FC<StyleBtnProps> = (props) => {
    const {textDecorationVal, onChangeStyle, fontWeightVal, fontStyleVal, value, onChange } = props
    const [letterSpacing, setLetterSpacing] = useState(0)
    const [lineHeight, setLineHeight] = useState(0)

    const handleFontSpace = (value: number) => {
        onChange({
            letterSpacing: value
        })
        setLetterSpacing(value)
    };

    const handleLineSpace = value => {
        onChange({
            lineHeight: value
        })
        setLineHeight(value)
    };

    const fontSpacingContent = (
        <div style={{
            width: '170px'
        }}>
            字间距:
            <Slider onChange={handleFontSpace} value={letterSpacing} defaultValue={1} max={10} step={1} />
            <InputNumber
                min={1}
                step={1}
                max={10}
                value={letterSpacing}
                onChange={handleFontSpace}
            />
        </div>
    )

    const lineSpacingContent = (
        <div style={{
            width: '170px'
        }}>
            行高:
            <Slider onChange={handleLineSpace} value={lineHeight} defaultValue={1} max={2} step={0.1} />
            <InputNumber
                min={1}
                max={2}
                step={0.1}
                value={lineHeight}
                onChange={handleLineSpace}
            />
        </div>
    )

    const textAlignContent = (
        <div className='text-align-btn'>
            <Button
                type="text"
                onClick={() => {
                    // setModelVisible(true);
                    onChange({
                        textAlign: 'left'
                    })
                }}
            >
                <i className="icon-T_Alignleft iconfont"></i>
                文字左对齐
            </Button>
            <Button
                type="text"
                onClick={() => {
                    onChange({
                        textAlign: 'center'
                    })
                }}
            >
                <i className="icon-T_Aligncenter iconfont"></i>
                文字居中对齐
            </Button>
            <Button
                type="text"
                onClick={() => {
                    onChange({
                        textAlign: 'right'
                    })
                }}
            >
                <i className="icon-T_Alignright iconfont"></i>
                文字居右对齐
            </Button>
        </div>
    )

    return (
        <div className="style-btn">
            <i className="icon-bold iconfont" onClick={() => {
                if (value?.fontWeight !== 'bold') {
                    onChange({
                        fontWeight: 'bold'
                    })
                } else {
                    onChange({
                        fontWeight: 'normal'
                    })
                }
            }}></i>
            <i className="icon-tilt iconfont" onClick={() => {
                if (value?.fontStyle !== 'italic') {
                    onChange({
                        fontStyle: 'italic'
                    })
                } else {
                    onChange({
                        fontStyle: 'normal'
                    })
                }
            }}></i>
            <i className="icon-Underscore iconfont no-border" onClick={() => {
                if (value?.textDecoration !== 'underline') {
                    onChange({
                        textDecoration: "underline"
                    })
                } else {
                    onChange({
                        textDecoration: "none"
                    })
                }
            }}></i>
            <Popover content={fontSpacingContent}>
                <i className="icon-Wordspacing iconfont"></i>
            </Popover>
            <Popover content={lineSpacingContent}>
                <i className="icon-Lineheight iconfont"></i>
            </Popover>
            <Popover trigger='click' overlayClassName="text-align-content" content={textAlignContent}>
                <i className="icon-T_Aligncenter iconfont no-border"></i>
            </Popover>
        </div>
    )
}
export default StyleBtn;