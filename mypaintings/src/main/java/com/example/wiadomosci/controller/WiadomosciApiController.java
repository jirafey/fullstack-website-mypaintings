package com.example.wiadomosci.controller;

import com.example.api.WiadomosciApi;
import com.example.model.*;
import com.example.wiadomosci.service.WiadomosciService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class WiadomosciApiController implements WiadomosciApi {

    @Autowired
    private WiadomosciService wiadomosciService;

    @Override
    public ResponseEntity<ResponseWiadomosciSendmessage> wiadomosciSendmessagePost(String authorization, @Valid RequestWiadomosciSendmessage body) {
        return wiadomosciService.wyslijWiadomosc(authorization, body);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciLatestTimestamps> wiadomosciLatestTimestampsGet(String authorization) {
        return wiadomosciService.getLatestTimestamps(authorization);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciReservepainting> wiadomosciReservepaintingIdobrazuPost(String authorization, Integer idobrazu) {
        return wiadomosciService.reservePainting(authorization, idobrazu);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciAcceptreservation> wiadomosciAcceptreservationIdrezerwacjiPost(String authorization, Integer idrezerwacji) {
        return wiadomosciService.acceptReservation(authorization, idrezerwacji);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciCancelreservation> wiadomosciCancelreservationIdrezerwacjiPost(String authorization, Integer idrezerwacji) {
        return wiadomosciService.cancelReservation(authorization, idrezerwacji);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciRequestdelivery> wiadomosciRequestdeliveryIdrezerwacjiPost(String authorization, Integer idrezerwacji) {
        return wiadomosciService.requestDelivery(authorization, idrezerwacji);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciAcceptdelivery> wiadomosciAcceptdeliveryIdrezerwacjiPost(String authorization, Integer idrezerwacji) {
        return wiadomosciService.acceptDelivery(authorization, idrezerwacji);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciConfirmdelivery> wiadomosciConfirmdeliveryIdrezerwacjiPost(String authorization, Integer idrezerwacji) {
        return wiadomosciService.confirmDelivery(authorization, idrezerwacji);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciFinalizeprocess> wiadomosciFinalizeprocessIdrezerwacjiPost(String authorization, Integer idrezerwacji) {
        return wiadomosciService.finalizeProcess(authorization, idrezerwacji);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciGetmessages> wiadomosciGetmessagesUserIdGet(String authorization, Integer userId) {
        return wiadomosciService.getMessages(authorization, userId);
    }

    @Override
    public ResponseEntity<ResponseWiadomosciTransactionstatus> wiadomosciTransactionstatusIdtransakcjiGet(String authorization, Integer idtransakcji) {
        return wiadomosciService.getTransactionStatus(authorization, idtransakcji);
    }


}