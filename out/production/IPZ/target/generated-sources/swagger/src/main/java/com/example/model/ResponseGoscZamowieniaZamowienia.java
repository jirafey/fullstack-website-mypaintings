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
 * ResponseGoscZamowieniaZamowienia
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseGoscZamowieniaZamowienia   {
  @JsonProperty("bought_on")
  private LocalDate boughtOn = null;

  @JsonProperty("price")
  private String price = null;

  @JsonProperty("hotel")
  private String hotel = null;

  @JsonProperty("status")
  private String status = null;

  @JsonProperty("image_url")
  private String imageUrl = null;

  public ResponseGoscZamowieniaZamowienia boughtOn(LocalDate boughtOn) {
    this.boughtOn = boughtOn;
    return this;
  }

  /**
   * Get boughtOn
   * @return boughtOn
   **/
  @Schema(example = "Wed Dec 11 01:00:00 CET 2024", description = "")
  
    @Valid
    public LocalDate getBoughtOn() {
    return boughtOn;
  }

  public void setBoughtOn(LocalDate boughtOn) {
    this.boughtOn = boughtOn;
  }

  public ResponseGoscZamowieniaZamowienia price(String price) {
    this.price = price;
    return this;
  }

  /**
   * Get price
   * @return price
   **/
  @Schema(example = "$650", description = "")
  
    public String getPrice() {
    return price;
  }

  public void setPrice(String price) {
    this.price = price;
  }

  public ResponseGoscZamowieniaZamowienia hotel(String hotel) {
    this.hotel = hotel;
    return this;
  }

  /**
   * Get hotel
   * @return hotel
   **/
  @Schema(example = "@Hotel Lord", description = "")
  
    public String getHotel() {
    return hotel;
  }

  public void setHotel(String hotel) {
    this.hotel = hotel;
  }

  public ResponseGoscZamowieniaZamowienia status(String status) {
    this.status = status;
    return this;
  }

  /**
   * Get status
   * @return status
   **/
  @Schema(example = "Waiting for payment (reception)", description = "")
  
    public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public ResponseGoscZamowieniaZamowienia imageUrl(String imageUrl) {
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
    ResponseGoscZamowieniaZamowienia responseGoscZamowieniaZamowienia = (ResponseGoscZamowieniaZamowienia) o;
    return Objects.equals(this.boughtOn, responseGoscZamowieniaZamowienia.boughtOn) &&
        Objects.equals(this.price, responseGoscZamowieniaZamowienia.price) &&
        Objects.equals(this.hotel, responseGoscZamowieniaZamowienia.hotel) &&
        Objects.equals(this.status, responseGoscZamowieniaZamowienia.status) &&
        Objects.equals(this.imageUrl, responseGoscZamowieniaZamowienia.imageUrl);
  }

  @Override
  public int hashCode() {
    return Objects.hash(boughtOn, price, hotel, status, imageUrl);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseGoscZamowieniaZamowienia {\n");
    
    sb.append("    boughtOn: ").append(toIndentedString(boughtOn)).append("\n");
    sb.append("    price: ").append(toIndentedString(price)).append("\n");
    sb.append("    hotel: ").append(toIndentedString(hotel)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
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
