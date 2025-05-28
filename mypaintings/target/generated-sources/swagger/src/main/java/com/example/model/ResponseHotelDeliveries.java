package com.example.model;

import java.util.Objects;
import com.example.model.ResponseHotelDeliveriesDeliveries;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelDeliveries
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseHotelDeliveries   {
  @JsonProperty("deliveries")
  @Valid
  private List<ResponseHotelDeliveriesDeliveries> deliveries = null;

  public ResponseHotelDeliveries deliveries(List<ResponseHotelDeliveriesDeliveries> deliveries) {
    this.deliveries = deliveries;
    return this;
  }

  public ResponseHotelDeliveries addDeliveriesItem(ResponseHotelDeliveriesDeliveries deliveriesItem) {
    if (this.deliveries == null) {
      this.deliveries = new ArrayList<>();
    }
    this.deliveries.add(deliveriesItem);
    return this;
  }

  /**
   * Get deliveries
   * @return deliveries
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseHotelDeliveriesDeliveries> getDeliveries() {
    return deliveries;
  }

  public void setDeliveries(List<ResponseHotelDeliveriesDeliveries> deliveries) {
    this.deliveries = deliveries;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelDeliveries responseHotelDeliveries = (ResponseHotelDeliveries) o;
    return Objects.equals(this.deliveries, responseHotelDeliveries.deliveries);
  }

  @Override
  public int hashCode() {
    return Objects.hash(deliveries);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelDeliveries {\n");
    
    sb.append("    deliveries: ").append(toIndentedString(deliveries)).append("\n");
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
