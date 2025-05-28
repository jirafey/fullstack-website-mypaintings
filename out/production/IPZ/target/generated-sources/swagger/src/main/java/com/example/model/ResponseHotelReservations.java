package com.example.model;

import java.util.Objects;
import com.example.model.ResponseHotelReservationsReservations;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelReservations
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelReservations   {
  @JsonProperty("reservations")
  @Valid
  private List<ResponseHotelReservationsReservations> reservations = null;

  public ResponseHotelReservations reservations(List<ResponseHotelReservationsReservations> reservations) {
    this.reservations = reservations;
    return this;
  }

  public ResponseHotelReservations addReservationsItem(ResponseHotelReservationsReservations reservationsItem) {
    if (this.reservations == null) {
      this.reservations = new ArrayList<>();
    }
    this.reservations.add(reservationsItem);
    return this;
  }

  /**
   * Get reservations
   * @return reservations
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseHotelReservationsReservations> getReservations() {
    return reservations;
  }

  public void setReservations(List<ResponseHotelReservationsReservations> reservations) {
    this.reservations = reservations;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelReservations responseHotelReservations = (ResponseHotelReservations) o;
    return Objects.equals(this.reservations, responseHotelReservations.reservations);
  }

  @Override
  public int hashCode() {
    return Objects.hash(reservations);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelReservations {\n");
    
    sb.append("    reservations: ").append(toIndentedString(reservations)).append("\n");
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
