package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelReservationsReservations
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelReservationsReservations   {
  @JsonProperty("reserved_on")
  private LocalDate reservedOn = null;

  @JsonProperty("buyer")
  private String buyer = null;

  @JsonProperty("dimensions")
  private String dimensions = null;

  @JsonProperty("image_url")
  private String imageUrl = null;

  public ResponseHotelReservationsReservations reservedOn(LocalDate reservedOn) {
    this.reservedOn = reservedOn;
    return this;
  }

  /**
   * Get reservedOn
   * @return reservedOn
   **/
  @Schema(example = "Wed Dec 11 01:00:00 CET 2024", description = "")
  
    @Valid
    public LocalDate getReservedOn() {
    return reservedOn;
  }

  public void setReservedOn(LocalDate reservedOn) {
    this.reservedOn = reservedOn;
  }

  public ResponseHotelReservationsReservations buyer(String buyer) {
    this.buyer = buyer;
    return this;
  }

  /**
   * Get buyer
   * @return buyer
   **/
  @Schema(example = "@user2025", description = "")
  
    public String getBuyer() {
    return buyer;
  }

  public void setBuyer(String buyer) {
    this.buyer = buyer;
  }

  public ResponseHotelReservationsReservations dimensions(String dimensions) {
    this.dimensions = dimensions;
    return this;
  }

  /**
   * Get dimensions
   * @return dimensions
   **/
  @Schema(example = "100cm x 100cm x 10cm", description = "")
  
    public String getDimensions() {
    return dimensions;
  }

  public void setDimensions(String dimensions) {
    this.dimensions = dimensions;
  }

  public ResponseHotelReservationsReservations imageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * Get imageUrl
   * @return imageUrl
   **/
  @Schema(example = "https://example.com/images/image.png", description = "")
  
    public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelReservationsReservations responseHotelReservationsReservations = (ResponseHotelReservationsReservations) o;
    return Objects.equals(this.reservedOn, responseHotelReservationsReservations.reservedOn) &&
        Objects.equals(this.buyer, responseHotelReservationsReservations.buyer) &&
        Objects.equals(this.dimensions, responseHotelReservationsReservations.dimensions) &&
        Objects.equals(this.imageUrl, responseHotelReservationsReservations.imageUrl);
  }

  @Override
  public int hashCode() {
    return Objects.hash(reservedOn, buyer, dimensions, imageUrl);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelReservationsReservations {\n");
    
    sb.append("    reservedOn: ").append(toIndentedString(reservedOn)).append("\n");
    sb.append("    buyer: ").append(toIndentedString(buyer)).append("\n");
    sb.append("    dimensions: ").append(toIndentedString(dimensions)).append("\n");
    sb.append("    imageUrl: ").append(toIndentedString(imageUrl)).append("\n");
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
