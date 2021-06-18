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
    const {textDecorationVal, onChangeStyle, fontWeightVal, fontStyleVal, value: allData, onChange } = props
    const [letterSpacing, setLetterSpacing] = useState(0)
    const [lineHeight, setLineHeight] = useState(0)
    const handleFontSpace = (value: number) => {
        onChange({
          ...allData,
          letterSpacing: value
        })
        setLetterSpacing(value)
    };

    const handleLineSpace = value => {
        onChange({
            ...allData,
            lineHeight: value
        })
        setLineHeight(value)
    };

    const fontSpacingContent = (
        <div style={{
            width: '170px'
        }}>
            字间距:
            <Slider onChange={handleFontSpace} value={allData?.letterSpacing} defaultValue={1} max={10} step={1} />
            <InputNumber
                min={1}
                step={1}
                max={10}
                value={allData?.letterSpacing}
                onChange={handleFontSpace}
            />
        </div>
    )

    const lineSpacingContent = (
        <div style={{
            width: '170px'
        }}>
            行高:
            <Slider onChange={handleLineSpace} value={allData?.lineHeight} defaultValue={1.5} max={2} step={0.1} />
            <InputNumber
                min={1}
                max={2}
                step={0.1}
                value={allData?.lineHeight}
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
                        ...allData,
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
                        ...allData,
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
                        ...allData,
                        textAlign: 'right'
                    })
                }}
            >
                <i className="icon-T_Alignright iconfont"></i>
                文字居右对齐
            </Button>
        </div>
    )
    const textAlignClass = {
      'center': 'icon-T_Aligncenter',
      'left': 'icon-T_Alignleft',
      'right': 'icon-T_Alignright'
    };
    return (
        <div className="style-btn">
            <i className={`icon-bold iconfont ${allData?.fontWeight === 'bold' ? 'selected' : ''}`} onClick={() => {
                if (allData?.fontWeight !== 'bold') {
                    onChange({
                        ...allData,
                        fontWeight: 'bold'
                    })
                } else {
                    onChange({
                        ...allData,
                        fontWeight: 'normal'
                    })
                }
            }}></i>
            <i className={`icon-tilt iconfont ${allData?.fontStyle === 'italic' ? 'selected' : ''}`} onClick={() => {
                if (allData?.fontStyle !== 'italic') {
                    onChange({
                        ...allData,
                        fontStyle: 'italic'
                    })
                } else {
                    onChange({
                        ...allData,
                        fontStyle: 'normal'
                    })
                }
            }}></i>
            <i className={`icon-Underscore iconfont no-border ${allData?.textDecoration === 'underline' ? 'selected' : ''}`} onClick={() => {
                if (allData?.textDecoration !== 'underline') {
                    onChange({
                        ...allData,
                        textDecoration: "underline"
                    })
                } else {
                    onChange({
                        ...allData,
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
                <i className={`iconfont no-border ${textAlignClass[allData?.textAlign] || 'icon-T_Alignleft'}`}></i>
            </Popover>
        </div>
    )
}
export default StyleBtn;