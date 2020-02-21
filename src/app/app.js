
import React, {
  useState,
  useEffect
} from 'react'
import Annotation from 'react-image-annotation'
import {
  PointSelector,
  RectangleSelector,
  OvalSelector
} from 'react-image-annotation/lib/selectors'

// http://arianv.me/react-image-annotation/docs

const App = props => {

  const [ loaded, setLoaded ] = useState(false)
  const [ annotations, setAnnotations ] = useState([])
  const [ annotation, setAnnotation ] = useState({})

  const onChange = (annotation) => {

    setAnnotation(annotation)
  }

  const onSubmit = annotation => {

    const { geometry, data } = annotation

    setAnnotation({})
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

  useEffect(() => {

    fetch('/wp-json/poeticagency/imageannotations')
    .then(response => {

      response.json()
      .then(data => {

        setAnnotations(JSON.parse(data))
        setLoaded(true)
      })
    })
  }, [])

  useEffect(() => {

    if(!loaded) { return }

    const data = new FormData()     
    data.append('annotations', JSON.stringify(annotations))

    const fetchConfig = {
      method: 'POST',
      body: data
    }

    fetch(
      '/wp-json/poeticagency/imageannotations',
      fetchConfig 
    )

  }, [annotations])
  
  return <div 
    className="Annotator"
  >
    <div className="Annotation">
      <Annotation
        src={ window.imageannotationsrc }
        annotations={ annotations }
        type={ RectangleSelector.TYPE }
        value={ annotation }
        onChange={ onChange }
        onSubmit={ onSubmit }
        allowTouch
      />
    </div>
    <div
      className="AnnotationsList">
      { annotations.length }
    </div>
  </div>
}

export default App