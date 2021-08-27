import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import Page from './Page'

const Loading = props => {
  return (
    <Page>
      <Backdrop open={true} style={{ zIndex: 9999 }} invisible>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Page>
  )
}

export default Loading