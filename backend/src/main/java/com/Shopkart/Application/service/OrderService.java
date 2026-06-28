package com.Shopkart.Application.service;

import com.Shopkart.Application.payload.OrderDTO;
import jakarta.transaction.Transactional;

import java.util.List;

public interface OrderService {

    @Transactional
    OrderDTO placeOrder(String emailId, Long addressId, String paymentMethod, String pgName, String pgPaymentId, String pgStatus, String pgResponseMessage);

    List<OrderDTO> getUserOrders(String email);

    List<OrderDTO> getAllOrders();

    @Transactional
    OrderDTO updateOrderStatus(Long orderId, String status);
}
