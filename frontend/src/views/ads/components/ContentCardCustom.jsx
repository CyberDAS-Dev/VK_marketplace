import * as React from 'react'
import { Card, Caption, Title, Text, Tappable, usePlatform, getClassName } from '@vkontakte/vkui'
import { hasReactNode } from '@vkontakte/vkjs'
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

    return (
        <Card
            mode={mode}
            getRootRef={getRootRef}
            className={getClassName('ContentCard', platform)}
            style={style}
        >
            <Tappable {...restProps} disabled={disabled} className="ContentCard__tappable">
                {(source || srcSet) && (
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
                )}
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
