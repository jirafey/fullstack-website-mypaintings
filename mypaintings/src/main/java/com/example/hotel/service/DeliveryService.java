package com.example.hotel.service;

import com.example.hotel.model.DeliveryInfo;
import com.example.hotel.model.ShippingAdress;
import com.example.hotel.repository.DeliveryInfoRepository;
import com.example.model.RequestHotelAddDeliveryInfo;
import com.example.model.ResponseHotelAddDeliveryInfo;
import com.example.model.ResponseHotelDeliveriesShipTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService {

    @Autowired
    private final DeliveryInfoRepository deliveryInfoRepository;

    public DeliveryService(DeliveryInfoRepository deliveryInfoRepository) {
        this.deliveryInfoRepository = deliveryInfoRepository;
    }

    public ResponseHotelAddDeliveryInfo addDeliveryInfo(Integer paintingId, RequestHotelAddDeliveryInfo request) {
        DeliveryInfo deliveryInfo = new DeliveryInfo();
        deliveryInfo.setPaintingId(paintingId);
        deliveryInfo.setPaidOn(request.getPaidOn());
        deliveryInfo.setBuyer(request.getBuyer());
        deliveryInfo.setDimensions(request.getDimensions());

        ResponseHotelDeliveriesShipTo shipToRequest = request.getShipTo();
        ShippingAdress shippingAddress = new ShippingAdress();
        shippingAddress.setFirstName(shipToRequest.getFirstName());
        shippingAddress.setLastName(shipToRequest.getLastName());
        shippingAddress.setStreetAddress(shipToRequest.getStreetAddress());
        shippingAddress.setCity(shipToRequest.getCity());
        shippingAddress.setStateProvinceRegion(shipToRequest.getStateProvinceRegion());
        shippingAddress.setZipCode(shipToRequest.getZipCode());
        shippingAddress.setEmailAddress(shipToRequest.getEmailAddress());
        shippingAddress.setPhoneNumber(shipToRequest.getPhoneNumber());

        deliveryInfo.setShipTo(shippingAddress);

        DeliveryInfo savedDelivery = deliveryInfoRepository.save(deliveryInfo);

        ResponseHotelAddDeliveryInfo response = new ResponseHotelAddDeliveryInfo();
        response.setMessage("Informacje o dostawie zostały dodane do obrazu.");
        response.setDeliveryId(savedDelivery.getId());

        return response;
    }
}