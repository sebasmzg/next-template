'use client';

import { LikeProduct, DisLikeProduct, GetProductId } from '@/app/api/products/actions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';

interface Props {
    productId: string;
}

const LikeButton: React.FC<Props> = ({ productId }) => {
    const { data: session } = useSession();
    const [liked, setLiked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (session) {
                const token = session.user.access_token.access_token as string;
                try {
                    const product = await GetProductId(productId, token);
                    setLiked(product.liked);
                } catch (error) {
                    console.error('Error al obtener el producto:', error);
                }
            }
        };

        fetchProduct();
    }, [productId, session]);

    const handleLike = async () => {
        if (loading) return;
        setLoading(true); 

        if (session) {
            const token = session.user.access_token.access_token as string;
            try {
                if (liked) {
                    await DisLikeProduct(productId, token);
                    setLiked(false);
                    console.log('Disliked');
                } else {
                    await LikeProduct(productId, token);
                    setLiked(true);
                    console.log('Liked');
                }
            } catch (error) {
                console.error('Error al dar o quitar like al producto:', error);
            } finally {
                setLoading(false); 
            }
        }
    };

    return (
        <button onClick={handleLike} disabled={loading}>
            {loading ? 'Cargando...' : <FaThumbsUp color={liked ? 'blue' : 'gray'} />}
        </button>
    );
};

export default LikeButton;
