import classnames from 'classnames'
import { Component } from 'react'
import withStyles, { WithStyles } from 'react-jss'
import { SaladTheme } from '../../../SaladTheme'
import i from './assets/i.svg'

const styles = (theme: SaladTheme) => ({
  infoButton: {
    color: theme.lightGreen,
    cursor: 'help',
    height: 18,
    width: 18,
    position: 'relative',
  },
})

interface Props extends WithStyles<typeof styles> {
  className?: string
  text?: string
}

class _InfoButton extends Component<Props> {
  render() {
    const { text, className, classes } = this.props
    return (
      <>
        <div className={classnames(classes.infoButton, className)} data-rh={text}>
          <img height={'auto'} width={'100%'} src={i} alt="" />
        </div>
      </>
    )
  }
}

export const InfoButton = withStyles(styles)(_InfoButton)
