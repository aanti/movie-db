import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const baseUrl = 'https://api.themoviedb.org/3'
const api_key = '8dac2ede24af47783ab4f6a7ecde823a'

function sendRequest (path, params = {}) {
  return axios.get(baseUrl + path, { params: { ...params, api_key } })
}

export const search = (query, page = 1) => sendRequest('/search/movie', { query, page })

export const getMovie = (id) => sendRequest(`/movie/${id}`)

export const getImages = (id) => sendRequest(`/movie/${id}/images`)