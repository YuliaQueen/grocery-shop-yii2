<?php


namespace app\controllers;


use app\models\Cart;
use app\models\Order;
use app\models\OrderProduct;
use app\models\Product;
use Yii;

class CartController extends AppController
{
    public function actionAdd($id)
    {
        $product = Product::findOne($id);
        if (empty($product)) {
            return false;
        }

        $session = \Yii::$app->session;
        $session->open();
        $cart = new Cart();
        $cart->addToCart($product);
        if (\Yii::$app->request->isAjax) {
            return $this->renderPartial('cart-modal', compact('session'));
        }
        return $this->redirect(\Yii::$app->request->referrer);
    }

    public function actionDelItem()
    {
        $id = \Yii::$app->request->get('id');

        $session = \Yii::$app->session;
        $session->open();

        $cart = new Cart();

        $cart->recalc($id);

        if (\Yii::$app->request->isAjax) {
            return $this->renderPartial('cart-modal', compact('session'));
        }

        return $this->redirect(\Yii::$app->request->referrer);
    }

    public function actionClearCart()
    {
        $session = \Yii::$app->session;
        $session->open();
        $session->remove('cart');
        $session->remove('cart.qty');
        $session->remove('cart.sum');

        return $this->renderPartial('cart-modal', compact('session'));
    }

    public function actionView()
    {
        $this->setMeta('Оформление заказа');
        $session = \Yii::$app->session;

        $order = new Order();
        $order_product = new OrderProduct();

        if ($order->load(\Yii::$app->request->post())) {
            $order->qty = $session['cart.qty'];
            $order->total = $session['cart.sum'];

            $transaction = Yii::$app->getDb()->beginTransaction();

            if (!$order->save() || !$order_product->saveOrderProducts($session['cart'], $order->id)) {
                debug($order, 1);

                Yii::$app->session->setFlash('error', 'Ошибка оформления заказа');
                $transaction->rollBack();
            } else {
                $transaction->commit();
                Yii::$app->session->setFlash('success', 'Заказ принят');
                $session->remove('cart');
                $session->remove('cart.qty');
                $session->remove('cart.sum');

                return $this->refresh();
            }
        }
        return $this->render('view', compact('session', 'order'));
    }
}
