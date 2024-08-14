import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import { toggleFavorite } from '../redux/favoritesSlice';

function FavoriteButton({ repoId }) {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.favorites);
    const isFavorite = favorites.includes(repoId);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(repoId));
    };

    return (
        <FontAwesomeIcon
            icon={isFavorite ? solidHeart : outlineHeart}
            style={{ cursor: 'pointer', color: isFavorite ? 'red' : 'gray' }}
            onClick={handleToggleFavorite}
        />
    );
}

export default FavoriteButton;
