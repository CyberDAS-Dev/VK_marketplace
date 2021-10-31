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

const ContentCard = (props) => {
    const {
        subtitle,
        header,
        text,
        caption,
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
        ...restProps
    } = props
    const platform = usePlatform()

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

    return (
        <Card
            mode={mode}
            getRootRef={getRootRef}
            className={getClassName('ContentCard', platform)}
            style={style}
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
                    {hasReactNode(text) && (
                        <Text className="ContentCard__text" weight="regular">
                            {text}
                        </Text>
                    )}
                    {hasReactNode(caption) && (
                        <Caption className="ContentCard__text" weight="regular" level="1">
                            {caption}
                        </Caption>
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
