import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Container,
  Poster,
  Title,
  RowContainer,
  Body1,
  ButtonPlay,
  ButtonPlayText,
  Description,
} from './styles'
import { useMovie } from '../../hooks/movie'
import { useFetch } from '../../hooks/useFetch'
import Rating from '../../components/Rating'
import Genres from '../../components/Genres'

interface Params {
  movie_id: string
}

const DetailMovie: React.FC = () => {
  const { transformToMovieDetail } = useMovie()

  const { params } = useRoute()
  const { movie_id } = params as Params

  const { data } = useFetch(`movie/${movie_id}`)

  if (!data) return <Text>Carregando...</Text>

  const movie = transformToMovieDetail(data)

  return (
    <Container>
      <Poster source={{ uri: movie.poster }} />
      <Title numberOfLines={1}>{movie.title}</Title>
      <RowContainer>
        <Body1>
          {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : null}
        </Body1>
        <Body1>{movie.runtime}min</Body1>
        {movie.rating ? (
          <Rating rating={movie.rating} ratingLabel={false} />
        ) : null}
      </RowContainer>
      {movie.genres ? <Genres genres={movie.genres} /> : null}
      <ButtonPlay>
        <Icon name="play" size={18} color="white" />
        <ButtonPlayText>Assistir</ButtonPlayText>
      </ButtonPlay>
      <Description numberOfLines={3}>{movie.description}</Description>
    </Container>
  )
}

export default DetailMovie
