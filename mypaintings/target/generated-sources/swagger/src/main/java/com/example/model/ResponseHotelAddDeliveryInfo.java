package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelAddDeliveryInfo
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseHotelAddDeliveryInfo   {
  @JsonProperty("message")
  private String message = null;

  @JsonProperty("delivery_id")
  private Integer deliveryId = null;

  public ResponseHotelAddDeliveryInfo message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
   **/
  @Schema(example = "Informacje o dostawie zostały dodane do obrazu.", description = "")
  
    public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ResponseHotelAddDeliveryInfo deliveryId(Integer deliveryId) {
    this.deliveryId = deliveryId;
    return this;
  }

  /**
   * Get deliveryId
   * @return deliveryId
   **/
  @Schema(example = "1", description = "")
  
    public Integer getDeliveryId() {
    return deliveryId;
  }

  public void setDeliveryId(Integer deliveryId) {
    this.deliveryId = deliveryId;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelAddDeliveryInfo responseHotelAddDeliveryInfo = (ResponseHotelAddDeliveryInfo) o;
    return Objects.equals(this.message, responseHotelAddDeliveryInfo.message) &&
        Objects.equals(this.deliveryId, responseHotelAddDeliveryInfo.deliveryId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(message, deliveryId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelAddDeliveryInfo {\n");
    
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    deliveryId: ").append(toIndentedString(deliveryId)).append("\n");
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
