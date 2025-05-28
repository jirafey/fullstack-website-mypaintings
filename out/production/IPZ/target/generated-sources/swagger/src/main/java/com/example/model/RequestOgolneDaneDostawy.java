package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * RequestOgolneDaneDostawy
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class RequestOgolneDaneDostawy   {
  @JsonProperty("street_address")
  private String streetAddress = null;

  @JsonProperty("city")
  private String city = null;

  @JsonProperty("state_province_region")
  private String stateProvinceRegion = null;

  @JsonProperty("zip_code")
  private String zipCode = null;

  @JsonProperty("email_address")
  private String emailAddress = null;

  @JsonProperty("phone_number")
  private String phoneNumber = null;

  public RequestOgolneDaneDostawy streetAddress(String streetAddress) {
    this.streetAddress = streetAddress;
    return this;
  }

  /**
   * Get streetAddress
   * @return streetAddress
   **/
  @Schema(example = "Baker Street 11/2", required = true, description = "")
      @NotNull

    public String getStreetAddress() {
    return streetAddress;
  }

  public void setStreetAddress(String streetAddress) {
    this.streetAddress = streetAddress;
  }

  public RequestOgolneDaneDostawy city(String city) {
    this.city = city;
    return this;
  }

  /**
   * Get city
   * @return city
   **/
  @Schema(example = "Szczecin", required = true, description = "")
      @NotNull

    public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public RequestOgolneDaneDostawy stateProvinceRegion(String stateProvinceRegion) {
    this.stateProvinceRegion = stateProvinceRegion;
    return this;
  }

  /**
   * Get stateProvinceRegion
   * @return stateProvinceRegion
   **/
  @Schema(example = "Zachodniopomorskie", required = true, description = "")
      @NotNull

    public String getStateProvinceRegion() {
    return stateProvinceRegion;
  }

  public void setStateProvinceRegion(String stateProvinceRegion) {
    this.stateProvinceRegion = stateProvinceRegion;
  }

  public RequestOgolneDaneDostawy zipCode(String zipCode) {
    this.zipCode = zipCode;
    return this;
  }

  /**
   * Get zipCode
   * @return zipCode
   **/
  @Schema(example = "70-000", required = true, description = "")
      @NotNull

    public String getZipCode() {
    return zipCode;
  }

  public void setZipCode(String zipCode) {
    this.zipCode = zipCode;
  }

  public RequestOgolneDaneDostawy emailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
    return this;
  }

  /**
   * Get emailAddress
   * @return emailAddress
   **/
  @Schema(example = "john_smith@example.com", required = true, description = "")
      @NotNull

    public String getEmailAddress() {
    return emailAddress;
  }

  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }

  public RequestOgolneDaneDostawy phoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
    return this;
  }

  /**
   * Get phoneNumber
   * @return phoneNumber
   **/
  @Schema(example = "+48 123 456 789", required = true, description = "")
      @NotNull

    public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RequestOgolneDaneDostawy requestOgolneDaneDostawy = (RequestOgolneDaneDostawy) o;
    return Objects.equals(this.streetAddress, requestOgolneDaneDostawy.streetAddress) &&
        Objects.equals(this.city, requestOgolneDaneDostawy.city) &&
        Objects.equals(this.stateProvinceRegion, requestOgolneDaneDostawy.stateProvinceRegion) &&
        Objects.equals(this.zipCode, requestOgolneDaneDostawy.zipCode) &&
        Objects.equals(this.emailAddress, requestOgolneDaneDostawy.emailAddress) &&
        Objects.equals(this.phoneNumber, requestOgolneDaneDostawy.phoneNumber);
  }

  @Override
  public int hashCode() {
    return Objects.hash(streetAddress, city, stateProvinceRegion, zipCode, emailAddress, phoneNumber);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RequestOgolneDaneDostawy {\n");
    
    sb.append("    streetAddress: ").append(toIndentedString(streetAddress)).append("\n");
    sb.append("    city: ").append(toIndentedString(city)).append("\n");
    sb.append("    stateProvinceRegion: ").append(toIndentedString(stateProvinceRegion)).append("\n");
    sb.append("    zipCode: ").append(toIndentedString(zipCode)).append("\n");
    sb.append("    emailAddress: ").append(toIndentedString(emailAddress)).append("\n");
    sb.append("    phoneNumber: ").append(toIndentedString(phoneNumber)).append("\n");
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
