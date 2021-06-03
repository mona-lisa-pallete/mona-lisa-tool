import { Button, InputNumber, Popover, Slider } from 'antd';
import React, { CSSProperties, useState } from 'react'
import './index.less'

interface StyleBtnProps {
    letterSpacing: number
    lineHeight: number
    fontWeightVal: boolean
    fontStyleVal: boolean
    textDecorationVal: boolean
    onChangeStyle: (css: CSSProperties) => void
}

const StyleBtn: React.FC<StyleBtnProps> = (props) => {
    const { letterSpacing, lineHeight, textDecorationVal, onChangeStyle, fontWeightVal, fontStyleVal } = props
    // const [letterSpacing, setFontSpace] = useState(0)
    // const [lineHeight, setLineSpace] = useState(0)

    const handleFontSpace = (value: number) => {
        onChangeStyle({
            letterSpacing: value
        })
    };

    const handleLineSpace = value => {
        onChangeStyle({
            lineHeight: value
        })
    };

    const fontSpacingContent = (
        <div style={{
            width: '170px'
        }}>
            字间距:
            <Slider onChange={handleFontSpace} value={letterSpacing} defaultValue={0} max={10} step={1} />
            <InputNumber
                min={1}
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
            <Slider onChange={handleLineSpace} value={lineHeight} defaultValue={0} max={10} step={1} />
            <InputNumber
                min={1}
                max={10}
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
                    onChangeStyle({
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
                    onChangeStyle({
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
                    onChangeStyle({
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
                if (!fontWeightVal) {
                    onChangeStyle({
                        fontWeight: 'bold'
                    })
                } else {
                    onChangeStyle({
                        fontWeight: 'normal'
                    })
                }
            }}></i>
            <i className="icon-tilt iconfont" onClick={() => {
                if (!fontStyleVal) {
                    onChangeStyle({
                        fontStyle: 'italic'
                    })
                } else {
                    onChangeStyle({
                        fontStyle: 'normal'
                    })
                }
            }}></i>
            <i className="icon-Underscore iconfont no-border" onClick={() => {
                if (!textDecorationVal) {
                    onChangeStyle({
                        textDecoration: "underline"
                    })
                } else {
                    onChangeStyle({
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