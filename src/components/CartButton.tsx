import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function CartButton() {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Button
      onClick={() => navigate('/cart')}
      variant="outline"
      size="lg"
      className="relative"
    >
      <Icon name="ShoppingCart" size={20} />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-red-500">
          {totalItems}
        </Badge>
      )}
    </Button>
  );
}
