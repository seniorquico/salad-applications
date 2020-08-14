import { Tag } from 'domelementtype'
import { DomElement } from 'domhandler'
import React, { Component, ReactElement } from 'react'
import ReactHtmlParser from 'react-html-parser'
import withStyles, { WithStyles } from 'react-jss'
import { SmartLink } from '../../../components'
import { SaladTheme } from '../../../SaladTheme'
import { Reward } from '../../reward/models'
import { RewardDetailsContentPanel } from './RewardDetailsContentPanel'

const styles = (theme: SaladTheme) => ({
  titleText: {
    fontFamily: theme.fontGroteskBook19,
    fontSize: 20,
    textTransform: 'capitalize',
  },
  bodyText: {
    whiteSpace: 'pre-line',
    fontFamily: theme.fontGroteskBook19,
    fontSize: theme.small,
    lineHeight: theme.medium,
  },
})

interface Props extends WithStyles<typeof styles> {
  reward?: Reward
}

class _RewardDescriptionPanel extends Component<Props> {
  transform(node: DomElement): ReactElement | undefined {
    // Transform `a` tags to external links.
    if (node.type === Tag && node.name === 'a') {
      const data = node.children != null && node.children.length > 0 ? node.children[0].data : ''
      const href = node.attribs != null ? node.attribs['href'] : undefined
      return (
        <SmartLink key={data} to={href}>
          {data}
        </SmartLink>
      )
    }

    return undefined
  }

  render() {
    const { reward, classes } = this.props

    if (!reward || !reward.description) return null

    return (
      <RewardDetailsContentPanel>
        <div className={classes.titleText}>Description</div>
        <div className={classes.bodyText}>{ReactHtmlParser(reward?.description, { transform: this.transform })}</div>
      </RewardDetailsContentPanel>
    )
  }
}

export const RewardDescriptionPanel = withStyles(styles)(_RewardDescriptionPanel)
