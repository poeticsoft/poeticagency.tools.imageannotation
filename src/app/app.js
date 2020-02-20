
import React, {
  useState,
  useEffect
} from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import * as Actions from './redux/actions'

// http://arianv.me/react-image-annotation/docs

const App = props => {

  const [ annotations, setAnnotations ] = useState([])
  const [ annotation, setAnnotation ] = useState({})

  const onChange = (annotation) => {

    setAnnotation(annotation)
  }

  const onSubmit = annotation => {

    const { geometry, data } = annotation

    setAnnotation({}),
    setAnnotations(
      annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    )
  }
  
  return <Provider store={ store }>
    <Annotation
      src={img}
      alt='Two pebbles anthropomorphized holding hands'

      annotations={this.state.annotations}

      type={this.state.type}
      value={this.state.annotation}
      onChange={this.onChange}
      onSubmit={this.onSubmit}
    />
  </Provider> 
}

export default App