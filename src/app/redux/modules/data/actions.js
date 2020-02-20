export const dataAnnotationsLoad = () => dispatch => {
  
  
}

export const DATA_ANNOTATIONS_LOADED = 'DATA_ANNOTATIONS_LOADED'
export const dataAnnotationsLoaded = data => ({
  type: DATA_ANNOTATIONS_LOADED,
  payload: {
    data: data
  }
})