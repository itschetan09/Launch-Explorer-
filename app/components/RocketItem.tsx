import { DocumentCard, DocumentCardActivity, DocumentCardPreview, DocumentCardTitle, ImageFit } from '@fluentui/react'
import React from 'react'

function RocketItem(props) {
    const {name, details, links, date_utc} = props

    const previewProps = {
        previewImages: [
          {
            name: name,
            linkProps: {
              href: 'http://bing.com',
              target: '_blank',
            },
            previewImageSrc: links.patch.small,
            iconSrc: links.patch.small,
            imageFit: ImageFit.cover,
            width: 318,
            height: 196,
          },
        ],
      };

      const DocumentCardActivityPeople = [{ name: details, profileImageSrc: links.patch.small }];

  return (
    <DocumentCard>
    <DocumentCardPreview {...previewProps} />
    <DocumentCardTitle
      title={
        name
      }
      shouldTruncate
    />

    <DocumentCardActivity activity={''+new Date(date_utc).toString()} people={DocumentCardActivityPeople} />
  </DocumentCard>
  )
}

export default RocketItem