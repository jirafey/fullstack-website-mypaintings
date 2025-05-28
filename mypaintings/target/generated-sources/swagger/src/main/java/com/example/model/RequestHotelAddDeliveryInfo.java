package com.example.model;

import java.util.Objects;
import com.example.model.ResponseHotelDeliveriesShipTo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * RequestHotelAddDeliveryInfo
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class RequestHotelAddDeliveryInfo   {
  @JsonProperty("paid_on")
  private LocalDate paidOn = null;

  @JsonProperty("buyer")
  private String buyer = null;

  @JsonProperty("dimensions")
  private String dimensions = null;

  @JsonProperty("ship_to")
  private ResponseHotelDeliveriesShipTo shipTo = null;

  public RequestHotelAddDeliveryInfo paidOn(LocalDate paidOn) {
    this.paidOn = paidOn;
    return this;
  }

  /**
   * Get paidOn
   * @return paidOn
   **/
  @Schema(example = "Wed Dec 11 01:00:00 CET 2024", required = true, description = "")
      @NotNull

    @Valid
    public LocalDate getPaidOn() {
    return paidOn;
  }

  public void setPaidOn(LocalDate paidOn) {
    this.paidOn = paidOn;
  }

  public RequestHotelAddDeliveryInfo buyer(String buyer) {
    this.buyer = buyer;
    return this;
  }

  /**
   * Get buyer
   * @return buyer
   **/
  @Schema(example = "@user2024", required = true, description = "")
      @NotNull

    public String getBuyer() {
    return buyer;
  }

  public void setBuyer(String buyer) {
    this.buyer = buyer;
  }

  public RequestHotelAddDeliveryInfo dimensions(String dimensions) {
    this.dimensions = dimensions;
    return this;
  }

  /**
   * Get dimensions
   * @return dimensions
   **/
  @Schema(example = "100cm x 100cm x 10cm", required = true, description = "")
      @NotNull

    public String getDimensions() {
    return dimensions;
  }

  public void setDimensions(String dimensions) {
    this.dimensions = dimensions;
  }

  public RequestHotelAddDeliveryInfo shipTo(ResponseHotelDeliveriesShipTo shipTo) {
    this.shipTo = shipTo;
    return this;
  }

  /**
   * Get shipTo
   * @return shipTo
   **/
  @Schema(required = true, description = "")
      @NotNull

    @Valid
    public ResponseHotelDeliveriesShipTo getShipTo() {
    return shipTo;
  }

  public void setShipTo(ResponseHotelDeliveriesShipTo shipTo) {
    this.shipTo = shipTo;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RequestHotelAddDeliveryInfo requestHotelAddDeliveryInfo = (RequestHotelAddDeliveryInfo) o;
    return Objects.equals(this.paidOn, requestHotelAddDeliveryInfo.paidOn) &&
        Objects.equals(this.buyer, requestHotelAddDeliveryInfo.buyer) &&
        Objects.equals(this.dimensions, requestHotelAddDeliveryInfo.dimensions) &&
        Objects.equals(this.shipTo, requestHotelAddDeliveryInfo.shipTo);
  }

  @Override
  public int hashCode() {
    return Objects.hash(paidOn, buyer, dimensions, shipTo);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RequestHotelAddDeliveryInfo {\n");
    
    sb.append("    paidOn: ").append(toIndentedString(paidOn)).append("\n");
    sb.append("    buyer: ").append(toIndentedString(buyer)).append("\n");
    sb.append("    dimensions: ").append(toIndentedString(dimensions)).append("\n");
    sb.append("    shipTo: ").append(toIndentedString(shipTo)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
