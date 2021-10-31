import * as React from 'react'
import {
    Card,
    Gallery,
    Caption,
    Title,
    Text,
    Tappable,
    usePlatform,
    getClassName,
} from '@vkontakte/vkui'
import { hasReactNode, isArray } from '@vkontakte/vkjs'
import './ContentCardCustom.css'
import { Icon28ChevronDownOutline } from '@vkontakte/icons'
import Expandable from './Expandable'

const ContentCard = (props) => {
    const {
        subtitle,
        header,
        text,
        cost,
        // card props
        className,
        mode,
        style,
        getRootRef,
        // img props
        getRef,
        maxHeight,
        image,
        src,
        srcSet,
        alt,
        width,
        height,
        crossOrigin,
        decoding,
        loading,
        referrerPolicy,
        sizes,
        useMap,
        expandable,
        limit,
        ...restProps
    } = props
    const platform = usePlatform()
    const [isExpanded, toggleIsExpanded] = React.useState(false)

    const disabled = restProps.disabled || typeof restProps.onClick !== 'function'

    const source = image || src

    let imageElement
    if (isArray(source) && source.length > 1) {
        imageElement = (
            <Gallery styleWidth="100%" bullets="light" style={{ height: maxHeight }}>
                {source.map((el, i) => {
                    return (
                        <img
                            key={el}
                            className="vkuiContentCard__img"
                            src={el}
                            srcSet={srcSet}
                            alt={alt}
                            crossOrigin={crossOrigin}
                            decoding={decoding}
                            loading={loading}
                            referrerPolicy={referrerPolicy}
                            sizes={sizes}
                            useMap={useMap}
                            height={height}
                            style={{ maxHeight }}
                            width="100%"
                        />
                    )
                })}
            </Gallery>
        )
    } else if (source || srcSet) {
        imageElement = (
            <img
                ref={getRef}
                className="vkuiContentCard__img"
                src={source}
                srcSet={srcSet}
                alt={alt}
                crossOrigin={crossOrigin}
                decoding={decoding}
                loading={loading}
                referrerPolicy={referrerPolicy}
                sizes={sizes}
                useMap={useMap}
                height={height}
                style={{ maxHeight }}
                width="100%"
            />
        )
    } else {
        imageElement = false
    }

    let textElement
    if (hasReactNode(text)) {
        if (expandable) {
            textElement = (
                <Expandable
                    className="ContentCard__text"
                    isExpanded={isExpanded}
                    cost={cost}
                    limit={limit}
                >
                    {text}
                </Expandable>
            )
        } else {
            textElement = (
                <Text className="ContentCard__text" weight="regular">
                    {text}
                </Text>
            )
        }
    } else {
        textElement = null
    }

    return (
        <Card
            mode={mode}
            getRootRef={getRootRef}
            className={getClassName('ContentCard', platform)}
            style={style}
            onClick={() => toggleIsExpanded(!isExpanded)}
        >
            <Tappable {...restProps} disabled={disabled} className="ContentCard__tappable">
                {imageElement}
                <div className="vkuiContentCard__body">
                    {hasReactNode(subtitle) && (
                        <Caption caps className="ContentCard__text" weight="semibold" level="3">
                            {subtitle}
                        </Caption>
                    )}
                    {hasReactNode(header) && (
                        <Title className="ContentCard__text" weight="semibold" level="3">
                            {header}
                        </Title>
                    )}
                    {textElement}
                    {hasReactNode(cost) && !isExpanded && (
                        <Caption className="ContentCard__text" weight="regular" level="1">
                            {cost}
                        </Caption>
                    )}
                    {expandable && !isExpanded && (
                        <Icon28ChevronDownOutline
                            style={{
                                position: 'absolute',
                                right: '5px',
                                bottom: '5px',
                                color: '#3f8ae0',
                            }}
                        />
                    )}
                </div>
            </Tappable>
        </Card>
    )
}

ContentCard.defaultProps = {
    mode: 'shadow',
}

export default ContentCard
